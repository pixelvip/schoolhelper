import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div className="modal-footer">
        <button type="button" className="btn btn-light" data-dismiss="modal" onClick={this.props.closeHandler}>Cancel</button>
        <button type="button" className="btn btn-secondary" onClick={this.props.saveHandler}>Save</button>
      </div>
    );
  }
}

export default Footer;
