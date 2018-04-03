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
        let event = result.docs[0].events.find(event => event.id === eventId);
        event.date = moment(result.docs[0]._id);
        let eventObj = null;

        switch(event.eventType) {
          case Event.eventType.Exam:
            eventObj = new Exam();
            break;
          default:
            eventObj = new Event();
        }

        eventObj.setInfo(event);
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

    event.setInfo(eventInfo);
    event.save();
    resolve(event);
  });
}
