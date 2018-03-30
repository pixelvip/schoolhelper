import Event from './Event';
import moment from 'moment';
import { agendaDB, examDB } from 'data/Database';

export default class Exam extends Event {
  constructor(examId, loadedCallback) {
    super();

    this.grade = null;
    this.eventType = "exam";

    this.findByID(examId, loadedCallback);
  }

  findByID(examId, loadedCallback) {
    if (examId) {
      agendaDB.find({
        selector: {
          events: {$elemMatch: {id: {$eq: parseInt(examId,  10)}}}
        }
      }).then(result => {
        examDB.get(examId).then(doc => {
          let gradeObj = doc.grades.find(gradeObj => gradeObj.user === "gianluca");
          if (gradeObj) {
            this.grade = gradeObj.grade;
          }

        }).catch(err =>
          console.log(err)

        ).then(() => {
          super.setInfo(result.docs[0].events[0], moment(result.docs[0]._id));

          if (loadedCallback) {
            loadedCallback(this);
          }
        });
      });
    }
  }
}
