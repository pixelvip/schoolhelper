import React, { Component } from 'react';
import PouchDB from 'pouchdb-browser';
import moment from 'moment';

class DayItem extends Component {
  constructor() {
    super();
    this.state = {
      events: false
    }

    this.db = new PouchDB('bms1b_agenda');
    this.db.replicate.from(process.env.REACT_APP_COUCHDB + 'bms1b_agenda', {
      live: true,
      retry: true
    }).on('change', info =>
      this.checkIfEventAvailable()
    ).on('error', err =>
      console.log(err)
    );
  }

  componentDidMount() {
    this.checkIfEventAvailable();
  }

  checkIfEventAvailable() {
    console.log("test");

    this.db.get(moment(this.props.date).format("YYYY-MM-DD").toString()).then(doc => {
      if (doc.events.length > 0) {
        this.setState({events: true});
      } else {
        this.setState({events: false});
      }
    }).catch(err =>
      this.setState({events: false})
    );
  }

  clickHandler() {
    this.props.clickHandler(this.props.date);
  }

  componentWillUnmount() {
    this.db.close();
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

    let eventStyle = {
      width: 0,
    	height: 0,
    	borderTop: "12px solid grey",
    	borderLeft: "12px solid transparent",

      position: "absolute",
      top: 0,
      right: 0
    }

    let eventIdenticator = this.state.events ? <div style={eventStyle} /> : null;

    return (
      <button className={this.props.selected ? "col btn btn-secondary" : "col btn btn-light"} {...opts} onClick={this.clickHandler.bind(this)}>
        {content}
        {eventIdenticator}
      </button>
    );
  }
}

export default DayItem;
