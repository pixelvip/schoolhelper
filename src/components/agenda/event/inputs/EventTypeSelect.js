import React, { Component } from 'react';

class EventTypeSelect extends Component {
  componentDidMount() {
    this.props.changeHandler("homework");
  }

  changeHandler(e) {
    this.props.changeHandler(e.target.value);
  }

  render() {
    return (
      <div className="form-group row">
        <label htmlFor="typeInput" className="col-sm-2 col-form-label">Type</label>
        <div className="col-sm-10">
          <select className="form-control" onChange={this.changeHandler.bind(this)} required>
            <option value="homework">Homework</option>
            <option value="exam">Exam</option>
            <option value="reminder">Reminder</option>
          </select>
        </div>
      </div>
    );
  }
}

export default EventTypeSelect;
