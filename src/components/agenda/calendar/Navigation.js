import React, { Component } from 'react';

class Navigation extends Component {
  render() {
    let content = [
      {modifier: 0, icon: "event"},
      {modifier: -1, icon: "keyboard_arrow_up"},
      {modifier: 1, icon: "keyboard_arrow_down"}
    ].map((info, i) =>
      <button key={i} className="btn btn-light" onClick={() => this.props.onClick(info.modifier)}><i className="material-icons">{info.icon}</i></button>
    );

    return (
      <div className="btn-group" role="group" aria-label="Basic example">
        {content}
      </div>
    )
  }
}

export default Navigation;
