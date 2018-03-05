import React, { Component } from 'react';
import moment from 'moment';
import { classDB } from 'data/Database';
import ScheduleItem from './ScheduleItem';

class Schedule extends Component {
  constructor() {
    super();
    this.state = {
      scheduleItems: []
    }
  }

  componentDidMount() {
    classDB.get("Lessons").then(doc => {
      let dayArray = doc.days;

      let day = dayArray.find(dayObject => dayObject.day >= moment().isoWeekday());
      if (day === undefined) {
        day = dayArray.find(dayObject => dayObject.day >= 0);
      }

      if (moment().isAfter(moment(day.lessons[day.lessons.length -1].endTime, "HH:mm"))) {
        day = dayArray.find(dayObject => dayObject.day > moment().isoWeekday());
        if (day == null) {
          day = dayArray.find(dayObject => dayObject.day > 0);
        }
      }
      this.setState({scheduleItems: day.lessons});

    }).catch(err =>
      console.log(err)
    );
  }

  render() {
    return (
      <div className="Schedule">
        {this.state.scheduleItems.length > 0 ? (
          this.state.scheduleItems.map(scheduleItem =>
            <ScheduleItem key={scheduleItem.subject} scheduleItem={scheduleItem} />)
        ) : (
          <p>No lessons found.</p>
        )}
      </div>
    );
  }
}

export default Schedule;
