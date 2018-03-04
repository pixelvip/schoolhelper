import React, { Component } from 'react';
import $ from 'jquery';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

class Modal extends Component {
  static types = Object.freeze({
    CancelSave: 1
  });

  componentWillReceiveProps(props) {
    if (this.props.open === false && props.open) {
      this.props.openHandler();
      $("#eventModal").modal("show");
    } else if (props.open === false) {
      $("#eventModal").modal("hide");
    }
  }

  render() {
    return (
      <div className="modal fade" id={this.props.id} tabIndex="-1" role="dialog" aria-labelledby={this.props.id + "Label"} aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <Header
              closeHandler={this.props.closeHandler}>
                {this.props.children[0]}
            </Header>
            <Body>
              {this.props.children[1]}
            </Body>
            <Footer
              closeHandler={this.props.closeHandler}
              saveHandler={this.props.saveHandler}>
                {this.props.children[2]}
            </Footer>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
