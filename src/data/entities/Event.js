export default class Event {
  constructor() {
    this.id = null;
    this.date = null;
    this.eventType = "";
    this.title = "";
    this.description = "";
    this.subject = "";
    this.private = false;
  }

  setInfo(event, date) {
    this.id = event.id;
    this.title = event.title;
    this.description = event.description;
    this.subject = event.subject;
    this.date = date;
  }

  findByID(id, loadedCallback) {

  }
}
