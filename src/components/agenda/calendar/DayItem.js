import React, { Component } from 'react';
import moment from 'moment';

class DayItem extends Component {
  clickHandler() {
    this.props.clickHandler(this.props.date);
  }

  render() {
    let opts = {};
    if (this.props.disabled) {
        opts['disabled'] = 'disabled';
    }

    let content = this.props.children;
    if (moment().isSame(moment(this.props.date), "day")) {
      //Works for header and today, moment without valid input = today
      content = <b>{this.props.children}</b>;
    }

    return (
      <button className={this.props.selected ? "col btn btn-secondary" : "col btn btn-light"} {...opts} onClick={this.clickHandler.bind(this)}>{content}</button>
    );
  }
}

export default DayItem;
