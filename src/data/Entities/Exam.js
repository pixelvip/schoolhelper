import Event from './Event';
import { examDB } from 'data/Database';

export default class Exam extends Event {
  constructor() {
    super();

    this.grade = null;
    this.eventType = Event.eventType.Exam;
  }

  setInfo(event, date) {
    return new Promise((resolve, reject) => {
      super.setInfo(event, date).then(() => {
        this.loadGrade().then(() => {
          resolve();
        });
      });
    });
  }

  save() {
    return new Promise((resolve, reject) => {
      super.save().then(async exam => {
        if (await this.checkIfExamExist()) {
          this.saveGrade();
        } else {
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
        resolve(this.grade);

      }).catch(err => {
        resolve();
      });
    });
  }

  checkIfExamExist() {
    return examDB.get(this.id).then(doc =>
      true
    ).catch(err =>
      false
    );
  }

  saveGrade() {
    if (this.grade) {
      examDB.get(this.id).then(doc => {
        doc.grades.push({
          user: localStorage.getItem("username"),
          grade: this.grade,
        });
        examDB.put(doc);
      });
    }
  }

  createExam() {
    examDB.put({
      _id: this.id,
      grades: [],
    });
  }

  delete() {
    return new Promise((resolve, reject) => {
      super.delete().then(() => {
        this.deleteExam().then(() => {
          resolve();
        });
      });
    });
  }

  deleteExam() {
    return new Promise((resolve, reject) => {
      examDB.get(this.id).then(doc => {
        examDB.remove(doc);
        resolve();
      });
    });
  }
}
