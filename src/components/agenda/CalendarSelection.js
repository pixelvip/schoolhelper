import React, { Component } from 'react';
import moment from 'moment';
import { range } from '../../utility/ArrayHelper';
import DayItem from './DayItem';

class CalendarSelection extends Component {
  test() {
    console.log("test");
  }

  isWeekend(date) {
    return (date.isoWeekday() === 6 || date.isoWeekday() === 7);
  }

  getDynamicCalendar() {
    let calendar = {};
    let startDate = moment();

    if (this.isWeekend(moment())) {
      startDate = moment().add(1, "weeks");
    }
    startDate.startOf('isoWeek');

    calendar.header = range(this.props.config.weekends ? 7 : 5).map(i => {
      return <DayItem key={"header_" + i} disabled={true}>{moment().isoWeekday(i+1).format("dd")}</DayItem>
    });

    calendar.numbers = range(this.props.config.weeks).map(weekNumber => {
      return (
        <div key={"weeknumber_" + weekNumber} className="row">
          {
            range(weekNumber * 7, weekNumber * 7 + 7).map(dayNumber => {
              let newDate = moment(startDate);
              newDate.add(dayNumber, "days");
              return newDate;
            }).filter(date => {
              if (!this.props.config.weekends) {
                return !this.isWeekend(date);
              }
              return true;
            }).map((date, i) => {
              return <DayItem key={i} date={date}>{date.date()}</DayItem>;
            })
          }
          <div className="w-100"></div>
        </div>
      )
    });

    return calendar;
  }

  getStaticCalendar() {
    return this.getDynamicCalendar();
  }

  render() {
    let calendar;
    if (this.props.config.dynamic) {
      calendar = this.getDynamicCalendar();
    } else {
      calendar = this.getStaticCalendar();
    }

    return (
      <div id="calendar">
        <div className="btn-group" role="group" aria-label="Basic example">
          <button className="btn btn-light" onClick={this.test}><i className="material-icons">event</i></button>
          <button className="btn btn-light" onClick={this.test}><i className="material-icons">keyboard_arrow_up</i></button>
          <button className="btn btn-light" onClick={this.test}><i className="material-icons">keyboard_arrow_down</i></button>
        </div>

        <div className="row">
          {calendar.header}
          <div className="w-100"></div>
        </div>

        {calendar.numbers}
      </div>
    );
  }
}

export default CalendarSelection;
