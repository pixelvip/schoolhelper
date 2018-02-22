import React, { Component } from 'react';

class AddEvent extends Component {
  render() {
    return (
      <div>
        <button type="button" className="addButton btn btn-light" onClick={this.props.onClick}>
          <span className="material-icons md-48">add</span>
        </button>
      </div>
    );
  }
}

export default AddEvent;
