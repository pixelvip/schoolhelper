import React, { Component } from 'react';
import ScheduleItem from './ScheduleItem';
import {ListGroup} from 'react-bootstrap';

class Schedule extends Component {
  render() {
    let scheduleItems;
    if (this.props.scheduleItems) {
        scheduleItems = this.props.scheduleItems.map(scheduleItem => {
          return (
            <ScheduleItem key={scheduleItem.subject} scheduleItem={scheduleItem} />
          )
        });
    }

    return (
      <div className="Schedule">
        <ListGroup>
          {scheduleItems}
        </ListGroup>
      </div>
    );
  }
}

export default Schedule;
