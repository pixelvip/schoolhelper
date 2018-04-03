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
  }

  save() {
    return new Promise((resolve, reject) => {
      super.save().then(exam => {
        console.log(this.checkIfExamExist());
        if (! this.checkIfExamExist()) {
          this.createExam();
        }
      });
    });
  }

  loadGrade() {
    return new Promise((resolve, reject) => {
      examDB.get(this.id).then(doc => {
        let gradeObj = doc.grades.find(gradeObj => gradeObj.user === localStorage.getItem("username"));
        if (gradeObj) {
          this.grade = gradeObj.grade;
        }

      }).catch(err =>
        console.log(err)
      );
    });
  }

  checkIfExamExist() {
    //NOT WORKING ASYNCHRONUS CHECK
    let exists = async () => {
      return await examDB.get(this.id).then(doc =>
        true
      ).catch(err =>
        false
      );
    }
    return exists;
  }

  createExam() {
    console.log({
      _id: this.id,
      grades: [],
    });
    // return examDB.put({
    //   _id: this.id,
    //   grades: [],
    // });
  }
}
