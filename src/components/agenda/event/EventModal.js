import React, { Component } from 'react';
import moment from 'moment';
import EventTypeSelect from './inputs/EventTypeSelect';
import SubjectSelect from './inputs/SubjectSelect';
import Modal from 'utility/components/modal/Modal';
import Event from 'data/entities/Event';

class EventModal extends Component {
  constructor(props) {
    super();
    this.state = {
      eventType: "",
      subject: "",
      date: props.date.format("YYYY-MM-DD").toString(),
      weight: 100,
    }
  }

  openHandler() {
    this.formRef.reset();
    this.setState({date: this.props.date.format("YYYY-MM-DD").toString()});
    this.date.value = this.props.date.format("YYYY-MM-DD").toString();

    if (this.props.event) {
      let event = this.props.event;

      this.title.value = event.title;
      this.description.value = event.description;
      this.date.value = event.date;
      this.private.checked = event.private;

      let weight = this.state.weight;
      if (event.eventType === Event.eventType.Exam) {
        weight = event.weight;
      } else {
        weight = 100;
      }

      this.setState({
        eventType: event.eventType,
        subject: event.subject,
        weight: weight,
      });
    } else {
      this.setState({
        subject: "search",
        weight: 100,
      });
    }
  }

  submitHandler() {
    let eventId = 0;
    let eventUser = "";

    if (this.props.event) {
      eventId = this.props.event.id;
      eventUser = this.props.event.user;
    } else {
      eventId = moment().valueOf();
      eventUser = localStorage.getItem("username");
    }

    let weight = 0;
    if (this.state.eventType === Event.eventType.Exam) {
      weight = this.weight.value;
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
      weight: parseInt(weight, 10),
    });

    this.props.closeHandler();
  }

  eventTypeChangedHandler(eventType) {
    this.setState({
      eventType: eventType,
    });
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
            <h5 className="modal-title" id="eventModalLabel">Event</h5>
          </div>
          <div>
            <form onSubmit={(e) => e.preventDefault()} autoComplete="off" ref={ref => this.formRef = ref}>
              <EventTypeSelect changeHandler={this.eventTypeChangedHandler.bind(this)} value={this.state.eventType} />

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

              {(this.state.eventType === Event.eventType.Exam) ? (
                <div className="form-group row">
                  <label htmlFor="gradeInput" className="col-sm-2 col-form-label">Weight</label>
                  <div className="col-sm-10">
                    <input type="number" step="1" min="1" max="100" defaultValue={this.state.weight} className="form-control" ref={ref => this.weight = ref} />
                  </div>
                </div>
              ) : (<div />)}

              <SubjectSelect changeHandler={this.subjectChangedHandler.bind(this)} value={this.state.subject} />

              <div className="form-group row">
                <label htmlFor="dateInput" className="col-sm-2 col-form-label">Due Date</label>
                <div className="col-sm-10">
                  <input type="date" className="form-control" onChange={this.dateChangedHandler.bind(this)} value={this.state.date} ref={ref => this.date = ref} required />
                </div>
              </div>

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
