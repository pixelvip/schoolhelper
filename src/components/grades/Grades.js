import React, { Component } from 'react';
import { classDB, examDB } from 'data/Database';
import Subject from './Subject';
import ExamSelectionModal from './ExamSelectionModal';
import Exam from 'data/entities/Exam';

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
      result.docs.map(exam => new Exam(exam._id, exam =>
        this.setState({
          examList: [...this.state.examList, exam]
        })
      ))
    );

    examDB.find({
      selector: {
        $or: [
          { grades: {$elemMatch: {user: {$nin: ['gianluca']}}} },
          { grades: {$size: 0} }
        ]
      }
    }).then(result =>
      result.docs.map(exam => new Exam(exam._id, exam =>
        this.setState({
          ungradedExamList: [...this.state.ungradedExamList, exam]
        })
      ))
    );
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
            return <Subject key={i} subject={subject} examList={examList} />
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
