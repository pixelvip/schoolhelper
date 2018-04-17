import React, { Component } from 'react';
import { round } from 'utility/functions/Calculation';

class Subject extends Component {

  calculateAverage(examList) {
    let weightedExamList = examList.map(exam => ({grade: parseFloat(exam.grade), weight: exam.weight/100}));
    let gradeSum = weightedExamList.reduce((p, c) => p + c.grade * c.weight, 0);
    let weightSum = weightedExamList.map(weightedExam => weightedExam.weight).reduce((p, c) => p + c);
    return round(gradeSum / weightSum, 2);
  }

  render() {
    return (
        <div className="card">
          <a className="card-header" id={this.props.subject.name + "Header"} data-toggle="collapse" data-target={"#" + this.props.subject.name} aria-expanded="false" aria-controls={this.props.subject.name}>
            <div className="d-flex justify-content-between">
              <div>
                {this.props.subject.name}
              </div>
              <div>
                {this.props.examList.length > 0 ? (
                  this.calculateAverage(this.props.examList)
                ) : (
                  <div />
                )}
              </div>
            </div>
          </a>

          <div id={this.props.subject.name} className="collapse" aria-labelledby={this.props.subject.name + "Header"}>
            <div className="card-body" style={{padding: "0px", margin: "-1px"}}>
              <ul className="list-group">
                {this.props.examList.length > 0 ? (
                  this.props.examList.map((exam, i) =>
                    <Grade key={i} exam={exam} gradeShowHandler={this.props.gradeShowHandler.bind(this)} />
                  )
                ) : (
                  <div>
                    <li className="list-group-item text-muted">
                      No Grades found.
                    </li>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
    );
  }
}

class Grade extends Component {
  gradeShowHandler() {
    this.props.gradeShowHandler(this.props.exam);
  }

  render() {
    return (
      <li className="list-group-item">
        <div className="d-flex justify-content-between" onClick={this.gradeShowHandler.bind(this)}>
          <div>
            {this.props.exam.title}
          </div>
          <div>
            {this.props.exam.grade}
          </div>
        </div>
      </li>
    )
  }
}

export default Subject;
