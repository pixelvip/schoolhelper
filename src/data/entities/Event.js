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
    this.id = event.id.toString();
    this.date = event.date;
    this.eventType = event.eventType;
    this.title = event.title;
    this.description = event.description;
    this.subject = event.subject;
    this.private = event.private;
    this.user = event.user;
  }

  save() {
    return new Promise((resolve, reject) => {
      let docList = [];

      agendaDB.find({
        selector: {
          events: {$elemMatch: {id: {$eq: parseInt(this.id, 10)}}}
        }
      }).then(async result => {
        if (result.docs.length > 0) {
          let eventList = result.docs[0].events;
          let event = eventList.find(event => event.id === this.id);
          let date = moment(result.docs[0]._id);
          let index = eventList.indexOf(event);

          if (this.date.isSame(date, 'days')) {
            eventList[index] = JSON.parse(JSON.stringify(this));
          } else {
            eventList.splice(index, 1);
            docList.push(await this.saveNewEvent());
          }

          docList.push(result.docs[0]);

        } else {
          docList.push(await this.saveNewEvent());
        }

        console.log(docList);
        //agendaDB.bulkDocs(docList).catch(err => console.log(err));
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
}
