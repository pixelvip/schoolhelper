import PouchDB from 'pouchdb-browser';
import PouchDBFind from 'pouchdb-find';

function getPouchDB(name) {
  PouchDB.plugin(PouchDBFind);
  return new PouchDB(name);
}

function getClassDB() {
  let db = getPouchDB('bms1b');
  db.sync(process.env.REACT_APP_COUCHDB + 'bms1b', {
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
  return process.env.REACT_APP_COUCHDB + 'bms1b';
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
  return process.env.REACT_APP_COUCHDB + 'bms1b_agenda';
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
  return process.env.REACT_APP_COUCHDB + 'bms1b_exam';
}
export let examRemoteDB = getExamRemoteDB();
