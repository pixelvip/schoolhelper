import React, { Component } from 'react';

class ScheduleItem extends Component {
  render() {
    return (
      <div className="ScheduleItem">
        <div className="card" >
        	<div className="card-body">
            <div className="row">
              <div className="col-auto mr-auto"><h4 className="card-title">{this.props.scheduleItem.subject}</h4></div>
              <div className="col-auto"><h6 className="card-subtitle mb-2 text-muted">{this.props.scheduleItem.startTime} - {this.props.scheduleItem.endTime}</h6></div>
            </div>
        		<p className="card-text"><i className="material-icons" style={{fontSize: "16px"}}>place</i> {this.props.scheduleItem.room}</p>
        	</div>
        </div>
      </div>
    );
  }
}

export default ScheduleItem;
