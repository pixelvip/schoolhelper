import React, { Component } from 'react';
import PouchDB from 'pouchdb-browser';
import moment from 'moment';
import Selection from './calendar/Selection';
import Table from './calendar/Table';
import AddEvent from './event/AddEvent';
import EventModal from './event/EventModal';

class Agenda extends Component {
  constructor() {
    super();
    this.state = {
      config: {
        dynamic: true,
        weeks: 4,
        weekends: false
      },
      dateSelection: moment()
    }

    this.db = null;
  }

  componentDidMount() {
    this.db = new PouchDB('bms1b_agenda');

    this.db.sync('http://mischka.i-t.me:5984/bms1b_agenda', {
      live: true,
      retry: true
    }).on('change', function (info) {
      // handle change
    }).on('error', function (err) {
      console.log(err);
    });
  }

  componentWillUnmount() {
    this.db.close();
  }

  onSelectHandler(date) {
    this.setState({dateSelection: date});
  }

  render() {
    return (
      <div className="container">
        <Selection config={this.state.config} onSelect={this.onSelectHandler.bind(this)} />
        <br />
        <Table date={this.state.dateSelection} />

        <AddEvent />
        <EventModal date={this.dateSelection} event={this.selectedEvent} />
      </div>
    );
  }
}

export default Agenda;
