import moment from 'moment';
import { agendaDB } from 'data/Database';
import Event from 'data/entities/Event';
import Exam from 'data/entities/Exam';

export function findEventById(eventId) {
  return new Promise((resolve, reject) => {
    if (eventId) {
      agendaDB.find({
        selector: {
          events: {$elemMatch: {id: {$eq: parseInt(eventId, 10)}}}
        }
      }).then(result => {
        console.log(result); //NEED TO SEARCH EVENT IN EVENTLIST, DOC CAN HAVE MULTIPLE EVENTS
        let event = result.docs[0].events[0];
        let date = result.docs[0]._id;
        let eventObj = null;

        switch(event.eventType) {
          case Event.eventType.Exam:
            eventObj = new Exam();
            break;
          default:
            eventObj = new Event();
        }

        eventObj.setInfo(event, date);
        resolve(eventObj);
      });
    }
  });
}

export function createEvent(eventInfo) {
  return new Promise((resolve, reject) => {
    let event = null;

    switch(eventInfo.eventType) {
      case Event.eventType.Exam:
        event = new Exam();
        break;
      default:
        event = new Event();
    }

    eventInfo.id = moment().valueOf();
    eventInfo.user = localStorage.getItem("username");

    event.setInfo(eventInfo);
    event.save();

  });
}
