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

  findByID(id, loadedCallback) {
    console.log("event.js");
  }
}
