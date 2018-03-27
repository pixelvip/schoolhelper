import React, { Component } from 'react';
import Modal from './Modal';

class Footer extends Component {
  render() {
    let content = [];

    switch (this.props.type) {
      case Modal.types.CancelSave:
        content[0] = <button key="1" type="button" className="btn btn-light" data-dismiss="modal" onClick={this.props.closeHandler}><span className="material-icons md-48">clear</span></button>
        content[1] = <button key="2" type="button" className="btn btn-secondary" onClick={this.props.saveHandler}><span className="material-icons md-48">done</span></button>
        break;
      case Modal.types.DeleteOk:
        content[0] = <button key="1" type="button" className="btn btn-danger mr-auto" onClick={this.props.deleteHandler}><span className="material-icons md-48">delete</span></button>;
        content[1] = <button key="2" type="button" className="btn btn-light" data-dismiss="modal" onClick={this.props.closeHandler}><span className="material-icons md-48">done</span></button>;
        break;
      case Modal.types.Cancel:
        content[0] = <button key="1" type="button" className="btn btn-light" data-dismiss="modal" onClick={this.props.closeHandler}><span className="material-icons md-48">clear</span></button>;
        break;
      default:
        content[0] = <button key="1" type="button" className="btn btn-light" data-dismiss="modal" onClick={this.props.closeHandler}><span className="material-icons md-48">done</span></button>;
    }

    return (
      <div className="modal-footer">
        {content}
      </div>
    );
  }
}

export default Footer;
