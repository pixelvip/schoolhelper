import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div className="modal-header">
        {this.props.children}
        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.closeHandler}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }
}

export default Header;
