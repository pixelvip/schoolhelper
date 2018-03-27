import React, { Component } from 'react';
import { classDB, agendaDB } from 'data/Database';
import Subject from './Subject';
import ExamSelectionModal from './ExamSelectionModal';

class Grades extends Component {
  constructor() {
    super();
    this.state = {
      subjectList: [],
      examSelectionModalOpen: false
    }

    this.examList = [];
  }

  componentDidMount() {
    classDB.get("Subjects").then(doc => {
      this.setState({subjectList: doc.subjects});

    }).catch(err =>
      console.log(err)
    );

    // agendaDB.find({
    //   selector: {
    //     name: 'mario'
    //   }
    // });
  }

  addGradeHandler() {
    this.examList = [];
    this.setState({examSelectionModalOpen: true});
  }

  examSelectionHandler() {
    console.log("examSelectionHandler");
  }

  render() {
    return (
      <div className="Grades">
        {this.examList.length > 0 ? (
          <div>
            <button type="button" className="btn btn-light btn-lg btn-block" onClick={this.addGradeHandler.bind(this)}>
              <span className="material-icons" style={{position:"relative", top:"3px"}}>note_add</span> Add Grade
            </button>
            <hr />
          </div>
        ) : (<div/>)}

        {this.state.subjectList.length > 0 ? (
          this.state.subjectList.map((subject, i) =>
            <Subject key={i} subject={subject} />)
        ) : (
          <p>No Subjects found.</p>
        )}

        <ExamSelectionModal
          open={this.state.examSelectionModalOpen}
          closeHandler={() => this.setState({examSelectionModalOpen: false})}
          examSelectionHandler={this.examSelectionHandler.bind(this)}
          examList={this.examList} />

      </div>
    );
  }
}

export default Grades;
