import React, { Component } from 'react';
import Modal from 'utility/components/modal/Modal';

class ExamSelectionModal extends Component {
  openHandler() {

  }

  examSelectionHandler(exam) {
    this.props.examSelectionHandler(exam);
    this.props.closeHandler();
  }

  render() {
    return (
      <Modal
        id="examSelectionModal"
        type={Modal.types.NoFooter}
        open={this.props.open}
        openHandler={this.openHandler.bind(this)}
        closeHandler={this.props.closeHandler}
        bodyStyle={{padding: "0px", margin: "-1px"}} >
          <div>
            <h5 className="modal-title" id="eventModalLabel">Select an Exam</h5>
          </div>

          <div>
            <div className="list-group">
              {this.props.examList.map((exam, i) => {
                return <ExamSelectionItem key={i} exam={exam} examSelectionHandler={this.examSelectionHandler.bind(this)}/>;
              })}
            </div>
          </div>
      </Modal>
    );
  }
}

class ExamSelectionItem extends Component {
  render() {
    return (
      <a className="list-group-item list-group-item-action" onClick={() => this.props.examSelectionHandler(this.props.exam)}>{this.props.exam.title} - {this.props.exam.subject}</a>
    )
  }
}

export default ExamSelectionModal;
