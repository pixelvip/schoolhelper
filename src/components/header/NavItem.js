import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

class NavItem extends Component {
  onClickHandler() {
    $('#navbarNav').collapse("hide");
  }

  render() {
    return (
      <li className="nav-item">
        <Link className="nav-link" onClick={this.onClickHandler} to={this.props.to}>{this.props.name}</Link>
      </li>
    );
  }
}

export default NavItem;
