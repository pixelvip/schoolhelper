import React, { Component } from 'react';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      username: localStorage.getItem("username"),
    }
  }

  saveUsernameHandler() {
    localStorage.setItem("username", this.state.username);
    alert("Username set to: " + this.state.username);
  }

  render() {
    return (
      <div className="container">
        <label htmlFor="usernameInput" className="col-form-label">Username</label>
        <input id="usernameInput" className="form-control" type="text" value={this.state.username} onChange={(event) => this.setState({username: event.target.value})} />
        <button style={{marginTop: "12px"}} type="button" className="btn btn-light" onClick={this.saveUsernameHandler.bind(this)}>Save</button>
      </div>
    );
  }
}

export default Settings;
