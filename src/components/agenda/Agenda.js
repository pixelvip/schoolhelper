import React, { Component } from 'react';
import moment from 'moment';
import { agendaDB } from 'data/Database';
import Selection from './calendar/Selection';
import Table from './calendar/Table';
import AddEvent from './event/AddEvent';
import EventModal from './event/EventModal';
import ShowEventModal from './event/ShowEventModal';
import { findEventById, createEvent } from 'data/EventHelper';

class Agenda extends Component {
  constructor() {
    super();
    this.state = {
      dateSelection: moment(),
      currentEventList: [],
      editModalOpen: false,
      showModalOpen: false
    }

    this.selectedEvent = null;

    agendaDB.changes({
      since: 'now',
      live: true,
      include_docs: false
    }).on('change', change => {
      if (change.id === this.state.dateSelection.format("YYYY-MM-DD").toString()) {
        this.loadCurrentEventList(this.state.dateSelection);
      }
    });
  }

  componentDidMount() {
    this.loadCurrentEventList(this.state.dateSelection);
  }

  selectionHandler(date) {
    this.setState({dateSelection: date});
    this.loadCurrentEventList(date);
  }

  loadCurrentEventList(date) {
    agendaDB.get(date.format("YYYY-MM-DD").toString()).then(doc => {

      Promise.all(doc.events.map(event => findEventById(event.id))).then(eventList => {
        this.setState({currentEventList: eventList});
      })
    }).catch(err =>
      this.setState({currentEventList: []})
    );
  }

  saveEventHandler(event) {
    if (event.isNew) {
      createEvent(event);
      this.selectionHandler(event.date);
    } else {
      findEventById(event.id).save();
      this.loadCurrentEventList(this.state.dateSelection);
    }
  }

  deleteEventHandler(event) {
    agendaDB.get(this.state.dateSelection.format("YYYY-MM-DD").toString()).then(eventDoc => {
      let eventList = eventDoc.events;
      let eventToDelete = eventList.find(docEvent => docEvent.id === event.id);
      eventList.splice(eventList.indexOf(eventToDelete), 1);
      agendaDB.put(eventDoc);
      this.loadCurrentEventList(this.state.dateSelection);

    }).catch(err =>
      console.log(err)
    );
  }

  //Open Event Modal for New Event
  eventNewHandler() {
    this.selectedEvent = null;
    this.setState({editModalOpen: true});
  }

  //Open Event Modal for Edit Event
  eventEditHandler(event) {
    this.selectedEvent = event;
    this.setState({editModalOpen: true});
  }

  //Show Event Info (plus deletion)
  eventShowHandler(event) {
    this.selectedEvent = event;
    this.setState({showModalOpen: true});
  }

  render() {
    return (
      <div className="container">
        <Selection
          dateSelection={this.state.dateSelection}
          onSelect={this.selectionHandler.bind(this)} />
        <br />
        <Table
          date={this.state.dateSelection}
          eventList={this.state.currentEventList}
          eventEditHandler={this.eventEditHandler.bind(this)}
          eventShowHandler={this.eventShowHandler.bind(this)} />

        <AddEvent
          onClick={this.eventNewHandler.bind(this)} />

        <EventModal
          open={this.state.editModalOpen}
          closeHandler={() => this.setState({editModalOpen: false})}
          saveEventHandler={this.saveEventHandler.bind(this)}
          date={this.state.dateSelection}
          event={this.selectedEvent} />

        <ShowEventModal
          open={this.state.showModalOpen}
          closeHandler={() => this.setState({showModalOpen: false})}
          deleteEventHandler={this.deleteEventHandler.bind(this)}
          event={this.selectedEvent} />
      </div>
    );
  }
}

export default Agenda;
