import React, { Component } from 'react';
import moment from 'moment';
import { agendaDB } from 'data/Database';
import Selection from './calendar/Selection';
import Table from './calendar/Table';
import AddEvent from './event/AddEvent';
import EventModal from './event/EventModal';

class Agenda extends Component {
  constructor() {
    super();
    this.state = {
      dateSelection: moment(),
      eventList: [],
      editModalOpen: false
    }

    // agendaDB.changes({
    //   since: 'now',
    //   live: true,
    //   include_docs: false
    // }).on('change', change =>
    //   this.loadEventList(this.state.dateSelection)
    // );
  }

  componentDidMount() {
    this.loadEventList(this.state.dateSelection);
  }

  selectionHandler(date) {
    this.setState({dateSelection: date});
    this.loadEventList(date);
  }

  loadEventList(date) {
    agendaDB.get(date.format("YYYY-MM-DD").toString()).then(doc =>
      this.setState({eventList: doc.events})
    ).catch(err =>
      this.setState({eventList: []})
    );
  }

  saveEventHandler(date, event) {
    let removeEvent = (date !== this.state.dateSelection);
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
        this.loadEventList(this.state.dateSelection);
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
      this.loadEventList(this.state.dateSelection);
    });
  }

  eventNewHandler() {
    this.selectedEvent = null;
    this.setState({editModalOpen: true});
  }

  eventEditHandler(event) {
    this.selectedEvent = event;
    this.setState({editModalOpen: true});
  }

  eventShowHandler(event) {
    console.log(event);
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
          eventList={this.state.eventList}
          eventEditHandler={this.eventEditHandler.bind(this)}
          eventShowHandler={this.eventShowHandler.bind(this)} />

        <AddEvent
          onClick={this.eventNewHandler.bind(this)} />
        <EventModal
          open={this.state.editModalOpen}
          closeHandler={() => this.setState({editModalOpen: false})}
          date={this.state.dateSelection}
          event={this.selectedEvent}
          newEventHandler={this.newEventHandler.bind(this)}
          saveEventHandler={this.saveEventHandler.bind(this)} />
      </div>
    );
  }
}

export default Agenda;
