import React, { Component } from 'react';
import PouchDB from 'pouchdb-browser';
import moment from 'moment';

class SubjectSelect extends Component {
  constructor() {
    super();
    this.state = {
      subjects: [],
      subjectSelection: ""
    }

    this.db = null;
  }

  componentDidMount() {
    this.db = new PouchDB('bms1b');
    this.db.replicate.from('http://mischka.i-t.me:5984/bms1b', {
      live: true,
      retry: true
    });

    this.db.get("Subjects").then(function (doc) {
      this.setState({subjects: doc.subjects});

    }.bind(this)).catch(function (err) {
      console.log(err);
    });

    this.db.get("Lessons").then(function (doc) {
      let day = doc.days.find(day => day.day === moment().isoWeekday());
      if (day != null) {
        let nowTime = moment().format("HH:mm");
  			let tenMinutesBeforeNow = moment(moment().subtract(10, "minutes")).format("HH:mm");

        let subject = day.lessons.find(lessons =>
          lessons.startTime <= nowTime && tenMinutesBeforeNow <= lessons.endTime
        );
  			if (subject) {
          this.setState({subjectSelection: subject.subject});
  			}
      }

    }.bind(this)).catch(function (err) {
      console.log(err);
    });
  }

  componentWillUnmount() {
    this.db.close();
  }

  render() {
    return (
      <div className="form-group row">
        <label htmlFor="subjectInput" className="col-sm-2 col-form-label">Subject</label>
        <div className="col-sm-10">
          <select className="form-control" onChange={this.props.onChangeHandler} value={this.state.subjectSelection}>
            {this.state.subjects.map((subject, i) =>
              <option key={i} value={subject.name}>{subject.name}</option>
            )}
          </select>
        </div>
      </div>
    );
  }
}

export default SubjectSelect;
