import React, { Component } from 'react';
import {ListGroupItem, Glyphicon} from 'react-bootstrap';

class ScheduleItem extends Component {
  render() {
    return (
      <div className="ScheduleItem">
        <ListGroupItem>
          <h4><strong>{this.props.scheduleItem.subject}</strong></h4>
          <h6>{this.props.scheduleItem.startTime} - {this.props.scheduleItem.endTime}</h6>
          <Glyphicon glyph="map-marker" /> {this.props.scheduleItem.room}
        </ListGroupItem>
      </div>
    );
  }
}

export default ScheduleItem;
