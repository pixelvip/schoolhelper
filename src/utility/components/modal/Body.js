import React, { Component } from 'react';

class Body extends Component {
  render() {
    return (
      <div className="modal-body">
        {this.props.children}
      </div>
    );
  }
}

export default Body;
