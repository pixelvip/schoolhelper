import React, { Component } from 'react';
import moment from 'moment';
import { classDB } from 'data/Database';

class SubjectSelect extends Component {
  constructor() {
    super();
    this.state = {
      subjects: [],
      subjectSelection: ""
    }
  }

  componentWillReceiveProps(props) {
    this.setState({subjectSelection: props.value});

    if (props.value === "search") {
      classDB.get("Lessons").then(doc => {
        let day = doc.days.find(day => day.day === moment().isoWeekday());
        if (day != null) {
          let nowTime = moment().format("HH:mm");
    			let tenMinutesBeforeNow = moment(moment().subtract(10, "minutes")).format("HH:mm");

          let subject = day.lessons.find(lessons =>
            lessons.startTime <= nowTime && tenMinutesBeforeNow <= lessons.endTime
          );

    			if (subject) {
            this.setState({subjectSelection: subject.subject});
    			} else {
            this.setState({subjectSelection: this.state.subjects[0].name});
          }
        }

      }).catch(err =>
        console.log(err)

      ).then(() => {
        if (this.state.subjectSelection !== "search") {
          this.props.changeHandler(this.state.subjectSelection)
        }
      });
    }
  }

  componentDidMount() {
    classDB.get("Subjects").then(doc => {
      this.setState({
        subjects: doc.subjects,
        subjectSelection: doc.subjects[0].name
      });

    }).catch(err =>
      console.log(err)
    );
  }

  changeHandler(e) {
    this.setState({subjectSelection: e.target.value});
    this.props.changeHandler(e.target.value);
  }

  render() {
    return (
      <div className="form-group row">
        <label htmlFor="subjectInput" className="col-sm-2 col-form-label">Subject</label>
        <div className="col-sm-10">
          <select className="form-control" onChange={this.changeHandler.bind(this)} value={this.state.subjectSelection}>
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
