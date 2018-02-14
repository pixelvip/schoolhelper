import React, { Component } from 'react';
import Schedule from './Schedule/Schedule';
import './App.css';
import PouchDB from 'pouchdb-browser';
import moment from 'moment';

import {Grid} from 'react-bootstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      scheduleItems: []
    }

    PouchDB.sync('bms1b', 'http://192.168.2.171:5984/bms1b', {
      live: true,
      retry: true
    }).on('change', function (info) {
      // handle change
    }).on('error', function (err) {
      console.log(err);
    });
  }

  componentDidMount() {
    let db = new PouchDB('bms1b');
    let outside = this;
    db.get("Lessons").then(function (doc) {
      outside.setState({scheduleItems: doc.days[moment().isoWeekday()].lessons});
    }).catch(function (err) {
      console.log(err);
    });
  }

  //componentWillUnmount() {}

  render() {
    return (
      <Grid>
        My App
        <Schedule scheduleItems={this.state.scheduleItems}/>
      </Grid>
    );
  }
}

export default App;
