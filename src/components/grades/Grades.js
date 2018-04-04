import React, { Component } from 'react';
import { classDB, examDB } from 'data/Database';
import Subject from './Subject';
import ExamSelectionModal from './ExamSelectionModal';
import ExamModal from './ExamModal';
import { findEventById } from 'data/EventHelper';

class Grades extends Component {
  constructor() {
    super();
    this.state = {
      subjectList: [],
      examList: [],
      ungradedExamList: [],
      examSelectionModalOpen: false,
      examModalOpen: false,
    }

    this.examSelection = null;

    examDB.changes({
      since: 'now',
      live: true,
      include_docs: false
    }).on('change', change => {
      this.loadData();
    });
  }

  componentDidMount() {
    classDB.get("Subjects").then(doc => {
      this.setState({subjectList: doc.subjects});
    }).catch(err =>
      console.log(err)
    );

    this.loadData();
  }

  loadData() {
    examDB.find({
      selector: {
        grades: {$elemMatch: {user: {$eq: localStorage.getItem("username")}}}
      }
    }).then(result => {
      this.setState({examList: []});
      result.docs.forEach(exam => findEventById(exam._id).then(exam =>
        this.setState({
          examList: [...this.state.examList, exam]
        })
      ));
    });

    examDB.find({
      selector: {
        $or: [
          { grades: {$elemMatch: {user: {$nin: [localStorage.getItem("username")]}}} },
          { grades: {$size: 0} }
        ]
      }
    }).then(result => {
      this.setState({ungradedExamList: []});
      result.docs.forEach(exam => findEventById(exam._id).then(exam =>
        this.setState({
          ungradedExamList: [...this.state.ungradedExamList, exam]
        })
      ));
    });
  }

  addGradeHandler() {
    this.setState({examSelectionModalOpen: true});
  }

  examSelectionHandler(exam) {
    this.examSelection = exam;
    this.setState({examModalOpen: true});
  }

  saveExamHandler(examInfo) {
    this.examSelection.grade = examInfo.grade;
    this.examSelection.save();
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

        <ExamModal
          open={this.state.examModalOpen}
          closeHandler={() => this.setState({examModalOpen: false})}
          saveEventHandler={this.saveExamHandler.bind(this)}
          exam={this.examSelection} />

      </div>
    );
  }
}

export default Grades;
