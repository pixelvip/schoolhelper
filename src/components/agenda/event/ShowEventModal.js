import React, { Component } from 'react';
import Modal from 'utility/components/modal/Modal';
import EventIcon from './EventIcon';

class ShowEventModal extends Component {
  constructor() {
    super();
    this.state = {
      event: {
        eventType: "",
        title: "",
        description: "",
        private: false,
        user: ""
      }
    }
  }

  openHandler() {
    if (this.props.event) {
      this.setState({event: this.props.event});
    }
  }

  deleteHandler() {
    this.props.deleteEventHandler(this.props.event);
    this.props.closeHandler();
  }

  render() {
    let event = this.state.event;

    return (
      <Modal
        id="showEventModal"
        type={Modal.types.DeleteOk}
        open={this.props.open}
        openHandler={this.openHandler.bind(this)}
        closeHandler={this.props.closeHandler}
        deleteHandler={this.deleteHandler.bind(this)} >

        <div>
          <h5 className="modal-title" id="showEventModalLabel">{event.title}</h5>
        </div>
        <div>
          <h6>{event.subject}</h6>
          <p>{event.description}</p>

          <EventIcon style={{position: "absolute", top: "10px", right: "15px"}} type={event.eventType} />

          {event.private === true ? (
            <b>private: <span className="material-icons" style={{position: "relative", top: "6px"}}>check</span></b>
          ) : (<div />)}

        </div>

      </Modal>
    );
  }
}

export default ShowEventModal;
