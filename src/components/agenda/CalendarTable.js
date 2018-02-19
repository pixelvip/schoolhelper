import React, { Component } from 'react';
import moment from 'moment';

class CalendarTable extends Component {
  render() {
    return (
      <div>
        <div className="row">
      		<div className="col">
      			<h5 id="selectionDayName">- Weekday -</h5>
      		</div>
      		<div className="col-auto">
      			<h6 id="selectionDateDisplay" className="text-muted">- Date -</h6>
      		</div>
      	</div>

      	<p id="noDataText">No Events found.</p>

      	<div id="eventTable">

      	</div>
      </div>
    );
  }
}

export default CalendarTable;
