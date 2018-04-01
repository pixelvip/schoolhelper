import Event from './Event';
import { examDB } from 'data/Database';

export default class Exam extends Event {
  constructor() {
    super();

    this.grade = null;
    this.eventType = Event.eventType.Exam;
  }

  async setInfo(event, date) {
    super.setInfo(event, date);
    await this.loadGrade();

    if (this.checkIfExamExist()) {
      this.createExam();
    }
  }

  save() {
    return new Promise((resolve, reject) => {
      resolve(super.save());
    });
  }

  loadGrade() {
    return new Promise((resolve, reject) => {
      examDB.get(this.id.toString()).then(doc => {
        let gradeObj = doc.grades.find(gradeObj => gradeObj.user === localStorage.getItem("username"));
        if (gradeObj) {
          this.grade = gradeObj.grade;
        }

      }).catch(err =>
        console.log(err)

      );
    });
  }

  async checkIfExamExist() {
    return await new Promise((resolve, reject) => {
      examDB.get(this.id).then(doc =>
        resolve(true)
      ).catch(err =>
        resolve(false)
      );
    });
  }

  createExam() {
    return new Promise((resolve, reject) => {
      examDB.put({
        _id: this.id,
        grades: [],
      });
    });
  }

  // saveEventHandler(date, event) {
  //   let removeEvent = (! date.isSame(this.state.dateSelection, 'day'));
  //   let docList = [];
  //
  //   agendaDB.get(this.state.dateSelection.format("YYYY-MM-DD").toString()).then(doc => {
  //     let eventList = doc.events;
  //     let docEvent = eventList.find(docEvent => docEvent.id === event.id);
  //     let index = eventList.indexOf(docEvent);
  //
  //     if (removeEvent) {
  //       eventList.splice(index, 1);
  //     } else {
  //       eventList[index] = event;
  //     }
  //
  //     docList.push(doc);
  //
  //     if (removeEvent) {
  //       let formattedDate = date.format("YYYY-MM-DD").toString();
  //       let targetDoc = [];
  //
  //       return agendaDB.get(formattedDate).then(doc =>
  //         targetDoc = doc
  //
  //       ).catch(err => {
  //         targetDoc = {
  //       		_id: formattedDate,
  //       		events: [],
  //       	}
  //
  //       }).then(() => {
  //         targetDoc.events.push(event);
  //         docList.push(targetDoc);
  //       });
  //     }
  //
  //   }).catch(err =>
  //     console.log(err)
  //
  //   ).then(() => {
  //     agendaDB.bulkDocs(docList).catch(err => console.log(err));
  //   });
  // }
}
