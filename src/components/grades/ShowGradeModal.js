import React, { Component } from 'react';
import moment from 'moment';
import Modal from 'utility/components/modal/Modal';
import Exam from 'data/entities/Exam';

class ShowGradeModal extends Component {
  constructor() {
    super();
    this.state = {
      exam: new Exam(),
    }
  }

  openHandler() {
    if (this.props.exam) {
      this.setState({exam: this.props.exam});
    }
  }

  editHandler() {
    this.props.editGradeHandler(this.props.exam);
    this.props.closeHandler();
  }

  deleteHandler() {
    this.props.deleteGradeHandler(this.props.exam);
    this.props.closeHandler();
  }

  render() {
    let exam = this.state.exam;

    return (
      <Modal
        id="showGradeModal"
        type={Modal.types.DeleteEditOk}
        open={this.props.open}
        openHandler={this.openHandler.bind(this)}
        closeHandler={this.props.closeHandler}
        editHandler={this.editHandler.bind(this)}
        deleteHandler={this.deleteHandler.bind(this)} >

        <div>
          <h5 className="modal-title" id="showGradeModalLabel">{this.state.exam.title}</h5>
        </div>
        <div>
          <h6>{moment(exam.date).format("DD.MM.YYYY")}</h6>
          <p>{exam.description}</p>
          Grade: <b>{exam.grade}</b><br />
          Weight: <b>{exam.weight}%</b>
        </div>

      </Modal>
    );
  }
}

export default ShowGradeModal;
