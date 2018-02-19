import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavItem from './NavItem';
import logo from './logo.svg';

class Header extends Component {
  render() {
    let logoStyle = {
      height: "45px",
      paddingTop: "5px"
    }

    let linkList = [
      {to:"/schedule", name:"Schedule"},
      {to:"/agenda", name:"Agenda"},
      {to:"/learn", name:"Learn"},
      {to:"/grades", name:"Grades"},
      {to:"/settings", name:"Settings"}
    ];

    let content = linkList.map((linkObject, count) => {
      return (
        <NavItem key={count} to={linkObject.to} name={linkObject.name} / >
      )
    });

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
    		<Link to="/schedule"><img src={logo} style={logoStyle} alt="logo" /></Link>
    		<button id="navbar-toggler" className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    			<span className="navbar-toggler-icon"></span>
    		</button>
    		<div id="navbarNav" className="collapse navbar-collapse">
    			<ul className="navbar-nav">
            <br />
            {content}
    			</ul>
        </div>
    	</nav>
    );
  }
}

export default Header;
