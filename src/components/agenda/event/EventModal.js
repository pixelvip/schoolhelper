import React, { Component } from 'react';
import EventTypeSelect from './inputs/EventTypeSelect';
import SubjectSelect from './inputs/SubjectSelect';

class EventModal extends Component {
  constructor() {
    super();
    this.eventType = "";
    this.subject = "";
  }

  submitHandler(e) {
    e.preventDefault();
    this.props.newEventHandler({
      eventType: this.eventType,
  		subject: this.subject,
  		title: this.refs.title.value,
  		description: this.refs.description.value,
  		//user: getUsername(),
  		private: this.refs.private.checked
    });
    console.log(this.refs.date.value);
  }

  onChangeEventTypeHandler(e) {
    this.eventType = e.target.value;
  }

  onChangeSubjectHandler(e) {
    this.subject = e.target.value;
  }

  render() {
    return (
        <div className="modal fade" id="eventModal" tabIndex="-1" role="dialog" aria-labelledby="eventModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="eventModalLabel">New Event</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">

                <form onSubmit={this.submitHandler.bind(this)} autoComplete="off">
                  <div className="form-group row">
                    <label htmlFor="titleInput" className="col-sm-2 col-form-label">Title</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" ref="title" required />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="descriptionInput">Description</label>
                    <textarea className="form-control" ref="description" rows="3"></textarea>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="dateInput" className="col-sm-2 col-form-label">Due Date</label>
                    <div className="col-sm-10">
                      <input type="date" className="form-control" ref="date" required />
                    </div>
                  </div>

                  <EventTypeSelect onChangeHandler={this.onChangeEventTypeHandler.bind(this)} />

                  <SubjectSelect onChangeHandler={this.onChangeSubjectHandler.bind(this)} />

                  <div className="form-check">
                    <label className="form-check-label">
                      <input type="checkbox" className="form-check-input" ref="private" />
                      private event
                    </label>
                  </div>
                  <br />

                  <div className="modal-footer">
                    <button type="button" className="btn btn-light" data-dismiss="modal">Cancel</button>
                    <input type="submit" value="Save" className="btn btn-secondary" />
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default EventModal;
