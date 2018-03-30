import React, { Component } from 'react';
import moment from 'moment';
import { agendaDB } from 'data/Database';
import Selection from './calendar/Selection';
import Table from './calendar/Table';
import AddEvent from './event/AddEvent';
import EventModal from './event/EventModal';
import ShowEventModal from './event/ShowEventModal';

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
    agendaDB.get(date.format("YYYY-MM-DD").toString()).then(doc =>
      this.setState({currentEventList: doc.events})
    ).catch(err =>
      this.setState({currentEventList: []})
    );
  }

  saveEventHandler(date, event) {
    let removeEvent = (! date.isSame(this.state.dateSelection, 'day'));
    let docList = [];

    agendaDB.get(this.state.dateSelection.format("YYYY-MM-DD").toString()).then(doc => {
      let eventList = doc.events;
      let docEvent = eventList.find(docEvent => docEvent.id === event.id);
      let index = eventList.indexOf(docEvent);

      if (removeEvent) {
        eventList.splice(index, 1);
      } else {
        eventList[index] = event;
      }

      docList.push(doc);

      if (removeEvent) {
        let formattedDate = date.format("YYYY-MM-DD").toString();
        let targetDoc = [];

        return agendaDB.get(formattedDate).then(doc =>
          targetDoc = doc

        ).catch(err => {
          targetDoc = {
        		_id: formattedDate,
        		events: [],
        	}

        }).then(() => {
          targetDoc.events.push(event);
          docList.push(targetDoc);
        });
      }

    }).catch(err =>
      console.log(err)

    ).then(() => {
      agendaDB.bulkDocs(docList).catch(err => console.log(err));
      if (removeEvent) {
        this.selectionHandler(date);
      } else {
        this.loadCurrentEventList(this.state.dateSelection);
      }
    });
  }

  newEventHandler(date, newEvent) {
    let formattedDate = date.format("YYYY-MM-DD").toString();
    let eventDoc = {};

    agendaDB.get(formattedDate).then(doc =>
      eventDoc = doc

    ).catch(() =>
      eventDoc = {
    		_id: formattedDate,
    		events: [],
    	}

    ).then(() => {
      eventDoc.events.push(newEvent);
      agendaDB.put(eventDoc);
      this.loadCurrentEventList(this.state.dateSelection);
    });
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
          newEventHandler={this.newEventHandler.bind(this)}
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
