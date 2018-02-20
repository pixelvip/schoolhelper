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
      dateSelection: moment(),
      eventList: []
    }
  }

  componentDidMount() {
    this.db = new PouchDB('bms1b_agenda');

    this.db.sync('http://mischka.i-t.me:5984/bms1b_agenda', {
      live: true,
      retry: true
    }).on('change', function (info) {
      this.loadEventList(this.state.dateSelection);
    }).on('error', function (err) {
      console.log(err);
    });

    this.loadEventList(this.state.dateSelection);
  }

  componentWillUnmount() {
    this.db.close();
  }

  onSelectHandler(date) {
    this.setState({dateSelection: date});
    this.loadEventList(date);
  }

  loadEventList(date) {
    this.db.get(date.format("YYYY-MM-DD").toString()).then(function (doc) {
      console.log(doc);
      this.setState({eventList: doc.events});

    }.bind(this)).catch(function (err) {
      this.setState({eventList: []});
    }.bind(this));
  }

  newEventHandler(date, newEvent) {
    let formattedDate = date.format("YYYY-MM-DD").toString();
    let eventDoc = {};
    this.db.get(formattedDate).then(function (doc) {
      eventDoc = doc;

    }).catch(function (err) {
      eventDoc = {
    		_id: formattedDate,
    		events: [],
    	}

    }).then(function () {
      eventDoc.events.push(newEvent);
      this.db.put(eventDoc);
      this.loadEventList(this.state.dateSelection);
    }.bind(this));
  }

  render() {
    return (
      <div className="container">
        <Selection onSelect={this.onSelectHandler.bind(this)} />
        <br />
        <Table date={this.state.dateSelection} eventList={this.state.eventList} />

        <AddEvent />
        <EventModal date={this.state.dateSelection} event={this.selectedEvent} newEventHandler={this.newEventHandler.bind(this)} />
      </div>
    );
  }
}

export default Agenda;
