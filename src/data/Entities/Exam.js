import Event from './Event';
import { examDB } from 'data/Database';

export default class Exam extends Event {
  constructor() {
    super();

    this.grade = null;
    this.weight = 100;
    this.eventType = Event.eventType.Exam;
  }

  setInfo(eventInfo) {
    return new Promise((resolve, reject) => {
      super.setInfo(eventInfo).then(() => {
        this.weight = eventInfo.weight;
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
          if (this.grade) {
            this.saveGrade();
          }
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

        this.weight = doc.weight;

        resolve(gradeObj);

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
    return new Promise((resolve, reject) => {
      examDB.get(this.id).then(doc => {
        let gradeObj = doc.grades.find(gradeObj => gradeObj.user === localStorage.getItem("username"));

        if (gradeObj) {
          if (this.grade) {
            gradeObj.grade = this.grade;

          } else {
            let index = doc.grades.indexOf(gradeObj);
            doc.grades.splice(index, 1);
          }
        } else {
          doc.grades.push({
            user: localStorage.getItem("username"),
            grade: this.grade,
          });
        }

        resolve(examDB.put(doc));
      });
    });
  }

  createExam() {
    examDB.put({
      _id: this.id,
      weight: this.weight,
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

  deleteGrade() {
    this.grade = null;
    return this.saveGrade();
  }
}
