import React, { Component } from 'react';

class EventIcon extends Component {
  render() {
    let icon = "";

    switch (this.props.type) {
      case 'homework':
        icon = "home";
        break;
      case "exam":
        icon = "border_color";
        break;
      case "reminder":
        icon = "info_outline";
        break;
      default:
        icon = "error";
    }

    return (
      <span className="material-icons" style={this.props.style}>{icon}</span>
    )
  }
}

export default EventIcon;
