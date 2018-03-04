import React, { Component } from 'react';
import moment from 'moment';
import { range } from 'utility/functions/ArrayHelper';
import Navigation from './Navigation';
import DayItem from './DayItem';

class Selection extends Component {
  constructor() {
    super();
    this.state = {
      config: {
        dynamic: true,
        weeks: 4,
        weekends: false
      },
      startDate: moment()
    }

    this.dateSelection = moment();
  }

  modifyDate(modifier) {
    if (modifier === 0) {
      this.selectHandler(moment());
      this.setState({startDate: moment()});
    } else {
      this.setState({startDate: moment(this.state.startDate).add(modifier, 'weeks')});
    }
  }

  selectHandler(date) {
    if (!this.state.config.weekends && this.isWeekend(date)) {
      date.add(1, "week").startOf("isoWeek");
    }

    this.dateSelection = date;
    this.props.onSelect(date);
  }

  componentDidMount() {
    this.selectHandler(moment());
  }

  getDynamicCalendar() {
    let calendar = {};
    let startDate = moment(this.state.startDate);

    if (this.isWeekend(moment()) && !this.state.config.weekends) {
      startDate.add(1, "weeks");
    }
    startDate.startOf('isoWeek');

    calendar.header = range(this.state.config.weekends ? 7 : 5).map(i => {
      return <DayItem key={"header_" + i} disabled={true}>{moment().isoWeekday(i+1).format("dd")}</DayItem>
    });

    calendar.days = range(this.state.config.weeks).map(weekNumber => {
      return (
        <div key={"weeknumber_" + weekNumber} className="row">
          {
            range(weekNumber * 7, weekNumber * 7 + 7).map(dayNumber => {
              let newDate = moment(startDate);
              newDate.add(dayNumber, "days");
              return newDate;
            }).filter(date => {
              if (!this.state.config.weekends) {
                return !this.isWeekend(date);
              }
              return true;
            }).map((date, i) => {
              return <DayItem key={i} date={date} selected={this.dateSelection.isSame(date, "day")} clickHandler={this.selectHandler.bind(this)}>{date.date()}</DayItem>;
            })
          }
          <div className="w-100"></div>
        </div>
      )
    });

    return calendar;
  }

  isWeekend(date) {
    return (date.isoWeekday() === 6 || date.isoWeekday() === 7);
  }

  getStaticCalendar() {
    return this.getDynamicCalendar();
  }

  render() {
    let calendar;
    if (this.state.config.dynamic) {
      calendar = this.getDynamicCalendar();
    } else {
      calendar = this.getStaticCalendar();
    }

    return (
      <div>
        <Navigation onClick={this.modifyDate.bind(this)} />

        <div className="row">
          {calendar.header}
          <div className="w-100"></div>
        </div>

        {calendar.days}
      </div>
    );
  }
}

export default Selection;
