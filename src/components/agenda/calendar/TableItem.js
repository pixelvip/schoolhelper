import React, { Component } from 'react';
import EventIcon from '../event/EventIcon';

class TableItem extends Component {
  eventShowHandler() {
    this.props.eventShowHandler(this.props.event);
  }

  render() {
    let iconStyle = {
      position: "relative",
      top: "7px",
      left: "13px",
      width: "50px",
      height: "50px"
    }

    return (
      <div className="card">
        <div className="media" onClick={this.eventShowHandler.bind(this)}>
          <EventIcon style={iconStyle} type={this.props.event.eventType} />
          <div className="media-body">
          <b className="card-title" style={{position: "relative", top: "4px"}}>{this.props.event.title}</b><br />
          <small className="card-subtitle">{this.props.event.subject}</small>
          </div>
        </div>
      </div>
    )
  }
}

export default TableItem;
