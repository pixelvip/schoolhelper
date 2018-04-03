import React, { Component } from 'react';
import moment from 'moment';
import EventTypeSelect from './inputs/EventTypeSelect';
import SubjectSelect from './inputs/SubjectSelect';
import Modal from 'utility/components/modal/Modal';

class EventModal extends Component {
  constructor(props) {
    super();
    this.state = {
      eventType: "",
      subject: "",
      date: props.date.format("YYYY-MM-DD").toString()
    }
  }

  openHandler() {
    this.formRef.reset();
    this.setState({date: this.props.date.format("YYYY-MM-DD").toString()});

    if (this.props.event) {
      let event = this.props.event;

      this.title.value = event.title;
      this.description.value = event.description;
      this.date.value = event.date;
      this.private.checked = event.private;

      this.setState({
        eventType: event.eventType,
        subject: event.subject
      });
    } else {
      this.setState({subject: "search"});
    }
  }

  submitHandler(e) {
    e.preventDefault();

    let eventId = 0;
    let eventUser = "";

    if (this.props.event) {
      eventId = this.props.event.id;
      eventUser = this.props.event.user;
    } else {
      eventId = moment().valueOf();
      eventUser = localStorage.getItem("username");
    }

    this.props.saveEventHandler({
      id: eventId,
      user: eventUser,
      eventType: this.state.eventType,
  		subject: this.state.subject,
  		title: this.title.value,
  		description: this.description.value,
  		private: this.private.checked,
      date: moment(this.date.value),
      isNew: this.props.event ? false : true,
    });

    this.props.closeHandler();
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
      <Modal
        id="eventModal"
        type={Modal.types.CancelSave}
        open={this.props.open}
        openHandler={this.openHandler.bind(this)}
        closeHandler={this.props.closeHandler}
        saveHandler={this.submitHandler.bind(this)} >
          <div>
            <h5 className="modal-title" id="eventModalLabel">New Event</h5>
          </div>
          <div>
            <form onSubmit={(e) => e.preventDefault()} autoComplete="off" ref={ref => this.formRef = ref}>
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

              <EventTypeSelect changeHandler={this.eventTypeChangedHandler.bind(this)} value={this.state.eventType} />

              <SubjectSelect changeHandler={this.subjectChangedHandler.bind(this)} value={this.state.subject} />

              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" className="form-check-input" ref={ref => this.private = ref} />
                  private event
                </label>
              </div>
            </form>
          </div>
      </Modal>
    );
  }
}

export default EventModal;
