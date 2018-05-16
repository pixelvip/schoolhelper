import React, { Component } from 'react';
import './Learn.css';
import moment from 'moment';
import ExamCard from './ExamCard';
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
          this.state.examList.sort((a, b) => {
            if (moment(a.date).isSame(b.date, 'day')) {
              return a.title > b.title;
            } else {
              return moment(a.date).isAfter(b.date, 'day');
            }
          }).map(exam =>
            <ExamCard key={exam.id} exam={exam} />)
        ) : (
          <p>No exams planned. Nothing to learn :)</p>
        )}
      </div>
    );
  }
}

export default Learn;
