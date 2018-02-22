import React, { Component } from 'react';
import ScheduleItem from './ScheduleItem';
import PouchDB from 'pouchdb-browser';
import moment from 'moment';

class Schedule extends Component {
  constructor() {
    super();
    this.state = {
      scheduleItems: []
    }
  }

  componentDidMount() {
    this.db = new PouchDB('bms1b');
    this.db.replicate.from(process.env.REACT_APP_COUCHDB + 'bms1b', {
      live: true,
      retry: true
    });

    this.db.get("Lessons").then(doc => {
      let dayArray = doc.days;
      let day = dayArray.find(dayObject => dayObject.day === moment().isoWeekday());
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

  componentWillUnmount() {
    this.db.close();
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
