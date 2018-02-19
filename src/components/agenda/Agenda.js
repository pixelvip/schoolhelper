import React, { Component } from 'react';
import PouchDB from 'pouchdb-browser';
import CalendarSelection from './CalendarSelection';
import CalendarTable from './CalendarTable';

class Agenda extends Component {
  constructor() {
    super();
    this.state = {
      config: {
        dynamic: true,
        weeks: 4,
        weekends: false
      }
    }
  }

  componentDidMount() {
    let db = new PouchDB('bms1b_agenda');

    PouchDB.sync(db, 'http://mischka.i-t.me:5984/bms1b_agenda', {
      live: true,
      retry: true
    }).on('change', function (info) {
      // handle change
    }).on('error', function (err) {
      console.log(err);
    });
  }

  onSelectHandler(date) {
    console.log(date);
  }

  render() {
    return (
      <div className="container">
        <CalendarSelection config={this.state.config} onSelect={this.onSelectHandler} />
        <br />
        <CalendarTable />

        <button type="button" className="addButton btn btn-light" data-toggle="modal" data-target="#eventModal" data-whatever="@mdo">
      		<span className="material-icons md-48">add</span>
      	</button>

        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
          Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                ...
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Agenda;
