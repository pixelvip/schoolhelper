import React, { Component } from 'react';
import Modal from 'utility/components/modal/Modal';

class ExamSelectionModal extends Component {
  openHandler() {

  }

  examSelectionHandler() {
    this.props.examSelectionHandler();
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
              {this.props.examList.map((exam, i) => <a key={i} className="list-group-item list-group-item-action">{exam.title} - {exam.subject}</a> )}
            </div>
          </div>
      </Modal>
    );
  }
}

export default ExamSelectionModal;
