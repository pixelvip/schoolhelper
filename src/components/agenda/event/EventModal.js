import React, { Component } from 'react';
import moment from 'moment';
import EventTypeSelect from './inputs/EventTypeSelect';
import SubjectSelect from './inputs/SubjectSelect';
import $ from 'jquery';

class EventModal extends Component {
  constructor(props) {
    super();
    this.state = {
      eventType: "",
      subject: "",
      date: props.date.format("YYYY-MM-DD").toString()
    }
  }

  componentWillReceiveProps(props) {
    this.setState({date: props.date.format("YYYY-MM-DD").toString()});
  }

  submitHandler(e) {
    e.preventDefault();
    this.props.newEventHandler(moment(this.date.value), {
      eventType: this.state.eventType,
  		subject: this.state.subject,
  		title: this.title.value,
  		description: this.description.value,
  		user: localStorage.getItem("username"),
  		private: this.private.checked
    });
    this.formRef.reset();
    $("#eventModal").modal('hide');
  }

  eventTypeChangedHandler(eventType) {
    this.setState({eventType: eventType});
  }

  subjectChangedHandler(subject) {
    this.setState({subject: subject});
  }

  dateChangedHandler(e) {
    this.setState({date: e.target.value});
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

                <form onSubmit={this.submitHandler.bind(this)} autoComplete="off" ref={ref => this.formRef = ref}>
                  <div className="form-group row">
                    <label htmlFor="titleInput" className="col-sm-2 col-form-label">Title</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" ref={ref => this.title = ref} required />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="descriptionInput">Description</label>
                    <textarea className="form-control" ref={ref => this.description = ref} rows="3"></textarea>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="dateInput" className="col-sm-2 col-form-label">Due Date</label>
                    <div className="col-sm-10">
                      <input type="date" className="form-control" onChange={this.dateChangedHandler.bind(this)} value={this.state.date} ref={ref => this.date = ref} required />
                    </div>
                  </div>

                  <EventTypeSelect changeHandler={this.eventTypeChangedHandler.bind(this)} />

                  <SubjectSelect changeHandler={this.subjectChangedHandler.bind(this)} />

                  <div className="form-check">
                    <label className="form-check-label">
                      <input type="checkbox" className="form-check-input" ref={ref => this.private = ref} />
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
