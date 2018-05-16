import React, { Component } from 'react';
import './ExamCard.css';

class ExamCard extends Component {
  selectExamHandler() {
    console.log(this.props.exam);
  }

  render() {
    return (
      <div className="examCard" onClick={this.selectExamHandler.bind(this)}>
        <div className="examPercent">
          {Math.floor(Math.random() * 101)}%
        </div>
        <div className="examCardBody">
          <h6 className="examCardTitle">{this.props.exam.title}</h6>
          <div className="examCardSubject">{this.props.exam.subject}</div>
        </div>
      </div>
    );
  }
}

export default ExamCard;
