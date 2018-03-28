import React, { Component } from 'react';
import { classDB, examDB } from 'data/Database';
import Subject from './Subject';
import ExamSelectionModal from './ExamSelectionModal';
import Exam from 'data/Entities/Exam';

class Grades extends Component {
  constructor() {
    super();
    this.state = {
      subjectList: [],
      examList: [],
      ungradedExamList: [],
      examSelectionModalOpen: false
    }
  }

  componentDidMount() {
    classDB.get("Subjects").then(doc => {
      this.setState({subjectList: doc.subjects});
    }).catch(err =>
      console.log(err)
    );

    examDB.find({
      selector: {
        grades: {$elemMatch: {user: {$eq: 'gianluca'}}}
      }
    }).then(result =>
      this.setState({examList: result.docs.map(exam => new Exam(exam._id, exam.grades.find(gradeObj => gradeObj.user === "gianluca").grade, () => this.forceUpdate()))})
    );

    examDB.find({
      selector: {
        $or: [
          { grades: {$elemMatch: {user: {$nin: ['gianluca']}}} },
          { grades: {$size: 0} }
        ]
      }
    }).then(result => {
      this.setState({ungradedExamList: result.docs.map(exam => new Exam(exam._id))});
    });
  }

  addGradeHandler() {
    console.log(this.state.examList);
    this.setState({examSelectionModalOpen: true});
  }

  examSelectionHandler() {
    console.log("examSelectionHandler");
  }

  render() {
    return (
      <div className="Grades">
        {this.state.ungradedExamList.length > 0 ? (
          <div>
            <button type="button" className="btn btn-light btn-lg btn-block" onClick={this.addGradeHandler.bind(this)}>
              <span className="material-icons" style={{position:"relative", top:"3px"}}>note_add</span> Add Grade
            </button>
            <hr />
          </div>
        ) : (<div/>)}

        {this.state.subjectList.length > 0 ? (
          this.state.subjectList.map((subject, i) => {
            let examList = this.state.examList.filter(exam => exam.subject === subject.name);
            if (subject.name === "French" && this.state.examList[0]) {
              console.log(this.state.examList[0].subject);
              console.log(this.state.examList[0].subject === subject.name);
              console.log(examList);
            }
            return <Subject key={i} subject={subject} examList={examList.filter(exam => exam.subject === subject.name)} />
        })) : (
          <p>No Subjects found.</p>
        )}

        <ExamSelectionModal
          open={this.state.examSelectionModalOpen}
          closeHandler={() => this.setState({examSelectionModalOpen: false})}
          examSelectionHandler={this.examSelectionHandler.bind(this)}
          examList={this.state.ungradedExamList} />

      </div>
    );
  }
}

export default Grades;
