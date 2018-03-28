import moment from 'moment';
import { agendaDB } from 'data/Database';

export default class Exam {
  constructor(examId, grade, loadedCallback) {
    if (examId) {
      agendaDB.find({
        selector: {
          events: {$elemMatch: {id: {$eq: parseInt(examId,  10)}}}
        }
      }).then(result => {
        this.setInfo(result.docs[0]);

        if (loadedCallback) {
          loadedCallback();
        }
      });
    }

    if (grade) {
      this.grade = grade;
    }
  }

  setInfo(doc) {
    let event = doc.events[0];

    this.id = event.id;
    this.title = event.title;
    this.description = event.description;
    this.subject = event.subject;
    this.date = moment(doc._id);
  }
}
