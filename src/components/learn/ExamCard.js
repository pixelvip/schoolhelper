import React, { Component } from 'react';
import './ExamCard.css';

class ExamCard extends Component {
  
  render() {
    return (
      <div className="examCard">
        <div className="examPercent">
          93%
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
