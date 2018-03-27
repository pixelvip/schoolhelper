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
              <a href="#" className="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
              <a href="#" className="list-group-item list-group-item-action">Morbi leo risus</a>
              <a href="#" className="list-group-item list-group-item-action">Porta ac consectetur ac</a>
              <a href="#" className="list-group-item list-group-item-action">Vestibulum at eros</a>
            </div>
          </div>
      </Modal>
    );
  }
}

export default ExamSelectionModal;