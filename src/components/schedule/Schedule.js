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
    let db = new PouchDB('bms1b');

    PouchDB.sync(db, 'http://mischka.i-t.me:5984/bms1b', {
      live: true,
      retry: true
    }).on('change', function (info) {
      // handle change
    }).on('error', function (err) {
      console.log(err);
    });

    let outside = this;
    db.get("Lessons").then(function (doc) {
      let day = doc.days.filter(dayObject => {
        

        return dayObject.day === moment().isoWeekday() && moment().isBefore(moment(day.lessons[day.lessons.length -1].endTime, "HH:mm"));
      })[0];
      if (day) {

      }

      console.log(day);
      outside.setState({scheduleItems: day.lessons});
    }).catch(function (err) {
      console.log(err);
    });
  }

  render() {
    let content;
    if (this.state.scheduleItems) {
        content = this.state.scheduleItems.map(scheduleItem => {
          return <ScheduleItem key={scheduleItem.subject} scheduleItem={scheduleItem} />
        });
    } else {
      content = <p>No lessons found.</p>
    }

    return (
      <div className="Schedule">
          {content}
      </div>
    );
  }
}

export default Schedule;
