import React, { Component } from 'react';
import EventIcon from '../event/EventIcon';

class TableItem extends Component {
  eventEditHandler() {
    this.props.eventEditHandler(this.props.event);
  }

  eventShowHandler() {
    this.props.eventShowHandler(this.props.event);
  }

  render() {
    return (
      <div className="card">
        <div style={{position: "absolute", top: "0", left: "0", height: "100%", width: "100%", zIndex: "1"}} onClick={this.eventShowHandler.bind(this)} />
        <div className="row">
          <div className="col">
            <EventIcon style={{position: "relative", top: "7px", left: "15px"}} type={this.props.event.eventType} />
          </div>
          <div className="col-7">
            <b className="card-title" style={{position: "relative", top: "4px"}}>{this.props.event.title}</b><br />
            <small className="card-subtitle">{this.props.event.subject}</small>
          </div>
          <div className="col">
            <button type="button" className="btn btn-light" style={{position: "relative", zIndex: "2"}} onClick={this.eventEditHandler.bind(this)}>
              <span className="material-icons">mode_edit</span>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default TableItem;
