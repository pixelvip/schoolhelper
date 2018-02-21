import React, { Component } from 'react';
import TableItem from './TableItem';

class Table extends Component {
  render() {
    return (
      <div>
        <div className="row">
      		<div className="col">
      			<h5 id="selectionDayName">{this.props.date.format("dddd")}</h5>
      		</div>
      		<div className="col-auto">
      			<h6 id="selectionDateDisplay" className="text-muted">{this.props.date.format("DD.MM.YYYY")}</h6>
      		</div>
      	</div>

      	{(this.props.eventList.length > 0) ? (
          this.props.eventList.map((event, i) =>
            <TableItem key={i} event={event} eventEditHandler={this.props.eventEditHandler} eventShowHandler={this.props.eventShowHandler} />
        )
        ) : (
          <p id="noDataText">No Events found.</p>
        )}
      </div>
    );
  }
}

export default Table;
