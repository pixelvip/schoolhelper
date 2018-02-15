import React, { Component } from 'react';

class ScheduleItem extends Component {
  render() {
    return (
      <div className="ScheduleItem">
        <div className="card" >
        	<div className="card-body">
        		<h4 className="card-title">{this.props.scheduleItem.subject}</h4>
        		<h6 className="card-subtitle mb-2 text-muted">{this.props.scheduleItem.startTime} - {this.props.scheduleItem.endTime}</h6>
        		<p className="card-text"><i className="material-icons">place</i> {this.props.scheduleItem.room}</p>
        	</div>
        </div>
      </div>
    );
  }
}

export default ScheduleItem;

//style="width: 20rem;"
