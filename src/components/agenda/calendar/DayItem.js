import React, { Component } from 'react';
import moment from 'moment';
import { agendaDB, agendaRemoteDB } from 'data/Database';

class DayItem extends Component {
  constructor(props) {
    super();
    this.state = {
      events: false
    }

    if (! props.disabled) {
      agendaDB.changes({
        since: 'now',
        live: true,
        include_docs: false
      }).on('change', change =>
        this.checkIfEventAvailable(change)
      );
    }
  }

  componentDidMount() {
    this.checkIfEventAvailable();
  }

  componentWillReceiveProps(props) {
    this.checkIfEventAvailable();
  }

  checkIfEventAvailable(change) {
    if (! this.props.disabled) {
      if (change && change.id === moment(this.props.date).format("YYYY-MM-DD").toString()) {
        agendaDB.replicate.from(agendaRemoteDB).then(() => this.loadEvents());
      }
      this.loadEvents();
    }
  }

  loadEvents() {
    agendaDB.get(moment(this.props.date).format("YYYY-MM-DD").toString()).then(doc => {
      this.setState({events: doc.events.length > 0});

    }).catch(err =>
      this.setState({events: false})
    );
  }

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

    let eventStyle = {
      width: 0,
    	height: 0,
    	borderTop: "12px solid grey",
    	borderLeft: "12px solid transparent",

      position: "absolute",
      top: 0,
      right: 0
    }

    let eventIdenticator = this.state.events ? <div style={eventStyle} /> : <div />;

    return (
      <button className={this.props.selected ? "col btn btn-secondary" : "col btn btn-light"} {...opts} onClick={this.clickHandler.bind(this)}>
        {content}
        {eventIdenticator}
      </button>
    );
  }
}

export default DayItem;
