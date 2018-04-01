import { agendaDB } from 'data/Database';

export default class Event {
  static eventType = Object.freeze({
    Homework: "homework",
    Exam: "exam",
    Reminder: "reminder",
  });

  constructor() {
    this.id = null;
    this.date = null;
    this.eventType = "";
    this.title = "";
    this.description = "";
    this.subject = "";
    this.private = false;
    this.user = null;
  }

  setInfo(event, date) {
    this.id = event.id;
    this.date = date;
    this.eventType = event.eventType;
    this.title = event.title;
    this.description = event.description;
    this.subject = event.subject;
    this.private = event.private;
    this.user = event.user;
  }

  save() {
    return new Promise((resolve, reject) => {
      let formattedDate = this.date.format("YYYY-MM-DD").toString();
      let eventDoc = {};

      agendaDB.find({
        selector: {
          events: {$elemMatch: {id: {$eq: parseInt(this.id, 10)}}}
        }
      }).then(result => {
        if (result.docs.length > 0) {
          // let doc = result.docs[0];
          // let eventList = doc.events;
          //
          // let docEvent = eventList.find(docEvent => docEvent.id === event.id);
          // let index = eventList.indexOf(docEvent);
          //
          // if (removeEvent) {
          //
          // } else {
          //   eventList[index] = event;
          // }
        



        } else {
          agendaDB.get(formattedDate).then(doc =>
            eventDoc = doc

          ).catch(() =>
            eventDoc = {
          		_id: formattedDate,
          		events: [],
          	}

          ).then(() => {
            eventDoc.events.push(this);
            agendaDB.put(eventDoc);
            resolve(this);
          });
        }
      });
    });
  }
}
