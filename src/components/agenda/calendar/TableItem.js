import React, { Component } from 'react';

class TableItem extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div style={{width: "10%", float: "left"}}>
            <img src="/open-iconic/svg/spreadsheet.svg" style={{width: "20px", marginLeft: "-6px"}} />
          </div>
          <div style={{width: "70%", float: "left"}}>
            <h5 className="card-title">{this.props.event.title}</h5>
            <h6 className="card-subtitle">{this.props.event.subject}</h6>
          </div>
          <button type="button" className="btn btn-light" style={{float: "right"}}>
            <span className="oi oi-pencil"></span>
          </button>
        </div>
      </div>
    )
  }
}

export default TableItem;
