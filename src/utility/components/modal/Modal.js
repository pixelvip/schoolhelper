import React, { Component } from 'react';
import $ from 'jquery';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

$(document).on('hidden.bs.modal', '.modal', function () {
    $('.modal:visible').length && $(document.body).addClass('modal-open');
});

class Modal extends Component {
  static types = Object.freeze({
    CancelSave: 1,
    DeleteOk: 2,
    Cancel: 3,
    NoFooter: 4,
    DeleteEditOk: 5,
  });

  componentWillReceiveProps(props) {
    if (this.props.open === false && props.open) {
      this.props.openHandler();
      $("#" + props.id).modal("show");
    } else if (props.open === false) {
      $("#" + props.id).modal("hide");
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
            <Body
              style={this.props.bodyStyle}>
              {this.props.children[1]}
            </Body>

            {this.props.type !== Modal.types.NoFooter ? (
              <Footer
                type={this.props.type}
                closeHandler={this.props.closeHandler}
                saveHandler={this.props.saveHandler}
                editHandler={this.props.editHandler}
                deleteHandler={this.props.deleteHandler} >
                  {this.props.children[2]}
              </Footer>
            ) : (<div />)}
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
