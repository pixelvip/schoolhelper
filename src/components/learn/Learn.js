import React, { Component } from 'react';
import './Learn.css';
import moment from 'moment';
import { examDB } from 'data/Database';
import { findEventById } from 'data/EventHelper';

class Learn extends Component {
  constructor() {
    super();
    this.state = {
      examList: []
    }
  }

  componentDidMount() {
    examDB.find({
      selector: {
        grades: {$size: 0}
      }
    }).then(result => {
      this.setState({examList: []});
      result.docs.forEach(exam => findEventById(exam._id).then(exam => {
        if (moment().isSameOrBefore(exam.date, 'day')) {
          this.setState({
            examList: [...this.state.examList, exam]
          });
        }
      }));
    });
  }

  render() {
    return (
      <div className="Learn">
        {this.state.examList.length > 0 ? (
          this.state.examList.map(exam =>
            <ExamItem key={exam.id} exam={exam} />)
        ) : (
          <p>No exams planned. Nothing to learn :)</p>
        )}
      </div>
    );
  }
}

class ExamItem extends Component {
  render() {
    return (
      <div className="examCard">
        <div className="examPercent">
          93%
        </div>
        <div className="examCardBody">
          <h5 className="examCardTitle">{this.props.exam.title}</h5>
          <div className="examCardSubject">{this.props.exam.subject}</div>
        </div>
      </div>
    )
  }
}

export default Learn;
