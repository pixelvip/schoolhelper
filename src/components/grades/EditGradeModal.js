import React, { Component } from 'react';
import Modal from 'utility/components/modal/Modal';

class EditGradeModal extends Component {
  openHandler() {
    this.formRef.reset();

    if (this.props.exam) {
      let exam = this.props.exam;

      this.grade.value = exam.grade;
      this.weight.value = exam.weight;
    }
  }

  submitHandler(e) {
    e.preventDefault();

    this.props.saveGradeHandler({
      grade: this.grade.value,
      weight: this.weight.value,
    });
    this.props.closeHandler();
  }

  render() {
    return (
      <Modal
        id="editGradeModal"
        type={Modal.types.CancelSave}
        open={this.props.open}
        openHandler={this.openHandler.bind(this)}
        closeHandler={this.props.closeHandler}
        saveHandler={this.submitHandler.bind(this)} >
          <div>
            <h5 className="modal-title" id="editGradeModalLabel">Grade</h5>
          </div>
          <div>
            <form onSubmit={(e) => e.preventDefault()} autoComplete="off" ref={ref => this.formRef = ref}>

              <div className="form-group row">
                <label htmlFor="gradeInput" className="col-sm-2 col-form-label">Grade</label>
                <div className="col-sm-10">
                  <input type="number" step="0.1" min="1" max="6" className="form-control" ref={ref => this.grade = ref} required />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="gradeInput" className="col-sm-2 col-form-label">Weight</label>
                <div className="col-sm-10">
                  <input type="number" step="1" min="1" max="100" className="form-control" ref={ref => this.weight = ref} />
                </div>
              </div>

            </form>
          </div>
      </Modal>
    );
  }
}

export default EditGradeModal;