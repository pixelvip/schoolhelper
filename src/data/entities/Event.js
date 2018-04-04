import { agendaDB } from 'data/Database';
import moment from 'moment';

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

  setInfo(event) {
    return new Promise((resolve, reject) => {
      this.id = event.id.toString();
      this.date = event.date;
      this.eventType = event.eventType;
      this.title = event.title;
      this.description = event.description;
      this.subject = event.subject;
      this.private = event.private;
      this.user = event.user;
      resolve();
    });
  }

  save() {
    return new Promise((resolve, reject) => {
      let docList = [];
      let docToBeDeleted = null;

      agendaDB.find({
        selector: {
          events: {$elemMatch: {id: {$eq: this.id}}}
        }
      }).then(async result => {
        if (result.docs.length > 0) {
          let doc = result.docs[0];
          let eventList = doc.events;
          let event = eventList.find(event => event.id === this.id);
          let date = moment(doc._id);
          let index = eventList.indexOf(event);

          if (this.date.isSame(date, 'days')) {
            eventList[index] = JSON.parse(JSON.stringify(this));
          } else {
            eventList.splice(index, 1);
            if (eventList.length > 0) {
              docList.push(await this.saveNewEvent());
            } else {
              docToBeDeleted = doc;
            }
          }

          docList.push(result.docs[0]);

        } else {
          docList.push(await this.saveNewEvent());
        }

        agendaDB.bulkDocs(docList).catch(err => console.log(err));

        if (docToBeDeleted) {
          agendaDB.remove(docToBeDeleted);
        }

        resolve(this);

      }).catch(err => {});
    });
  }

  //private function
  saveNewEvent() {
    return new Promise((resolve, reject) => {
      let formattedDate = moment(this.date).format("YYYY-MM-DD").toString();
      let eventDoc = {};

      agendaDB.get(formattedDate).then(doc =>
        eventDoc = doc

      ).catch(() =>
        eventDoc = {
          _id: formattedDate,
          events: [],
        }

      ).then(() => {
        eventDoc.events.push(JSON.parse(JSON.stringify(this)));
        resolve(eventDoc);
      });
    });
  }

  delete() {
    return new Promise((resolve, reject) => {
      agendaDB.get(this.date.format("YYYY-MM-DD").toString()).then(eventDoc => {
        let eventList = eventDoc.events;
        let eventToDelete = eventList.find(docEvent => docEvent.id === this.id);
        eventList.splice(eventList.indexOf(eventToDelete), 1);
        agendaDB.put(eventDoc);
        resolve();

      }).catch(err =>
        console.log(err)
      );
    });
  }
}
