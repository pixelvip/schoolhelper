import React, { Component } from 'react';
import PouchDB from 'pouchdb-browser';
import moment from 'moment';
import $ from 'jquery';
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
    }).on('change', info =>
      this.loadEventList(this.state.dateSelection)

    ).on('error', err =>
      console.log(err)
    );

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
    this.db.get(date.format("YYYY-MM-DD").toString()).then(doc =>
      this.setState({eventList: doc.events})
    ).catch(err =>
      this.setState({eventList: []})
    );
  }

  newEventHandler(date, newEvent) {
    let formattedDate = date.format("YYYY-MM-DD").toString();
    let eventDoc = {};
    this.db.get(formattedDate).then(doc =>
      eventDoc = doc

    ).catch(err =>
      eventDoc = {
    		_id: formattedDate,
    		events: [],
    	}

    ).then(() => {
      eventDoc.events.push(newEvent);
      this.db.put(eventDoc);
      this.loadEventList(this.state.dateSelection);
    });
  }

  eventEditHandler(event) {
    this.selectedEvent = event;
    $("#eventModal").modal('show');
  }

  eventShowHandler(event) {
    console.log(event);
  }

  render() {
    return (
      <div className="container">
        <Selection onSelect={this.onSelectHandler.bind(this)} />
        <br />
        <Table
          date={this.state.dateSelection}
          eventList={this.state.eventList}
          eventEditHandler={this.eventEditHandler.bind(this)}
          eventShowHandler={this.eventShowHandler.bind(this)} />

        <AddEvent />
        <EventModal
          date={this.state.dateSelection}
          event={this.selectedEvent}
          newEventHandler={this.newEventHandler.bind(this)} />
      </div>
    );
  }
}

export default Agenda;
