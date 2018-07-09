import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

function getPouchDB(name) {
  PouchDB.plugin(PouchDBFind);
  return new PouchDB(name);
}

function getCouchDBURL() {
  let couchDBURL = process.env.REACT_APP_DEV_COUCHDB;
  if (process.env.NODE_ENV === 'production') {
    couchDBURL = process.env.REACT_APP_COUCHDB;
  }
  return couchDBURL;
}

function getClassDB() {
  let db = getPouchDB('bms1b');
  db.sync(getClassRemoteDB(), {
    live: true,
    retry: true
  }).on('error', err =>
    console.log(err)
  );
  db.setMaxListeners(20);
  return db;
}
export let classDB = getClassDB();

function getClassRemoteDB() {
  return getCouchDBURL() + 'bms1b';
}
export let classRemoteDB = getClassRemoteDB();


function getAgendaDB() {
  let db = getPouchDB('bms1b_agenda');
  db.sync(getAgendaRemoteDB(), {
    live: true,
    retry: true
  }).on('error', err =>
    console.log(err)
  );
  db.setMaxListeners(130);
  return db;
}
export let agendaDB = getAgendaDB();

function getAgendaRemoteDB() {
  return getCouchDBURL() + 'bms1b_agenda';
}
export let agendaRemoteDB = getAgendaRemoteDB();


function getExamDB() {
  let db = getPouchDB('bms1b_exam');
  db.sync(getExamRemoteDB(), {
    live: true,
    retry: true
  }).on('error', err =>
    console.log(err)
  );
  db.setMaxListeners(20);
  return db;
}
export let examDB = getExamDB();

function getExamRemoteDB() {
  return getCouchDBURL() + 'bms1b_exam';
}
export let examRemoteDB = getExamRemoteDB();
