import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';

class Header extends Component {
  render() {
    let logoStyle = {
      height: "45px",
      paddingTop: "5px"
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
    		<Link to="/schedule"><img src={logo} style={logoStyle} alt="logo" /></Link>

    		<button id="navbar-toggler" className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    			<span className="navbar-toggler-icon"></span>
    		</button>
    		<div id="navbarNav" className="collapse navbar-collapse">
    			<ul className="navbar-nav">
    				<li className="nav-item">
    					<Link to="/schedule">Schedule</Link>
    				</li>
    				<li className="nav-item">
    					<Link to="/agenda">Agenda</Link>
    				</li>
    				<li className="nav-item">
              <Link to="/learn">Learn</Link>
    				</li>
    				<li className="nav-item">
              <Link to="/grades">Grades</Link>
    				</li>
    				<li className="nav-item">
              <Link to="/link">Settings</Link>
    				</li>
    			</ul>
    		</div>
    	</nav>
    );
  }
}

export default Header;
