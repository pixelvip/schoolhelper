import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/header/Header';
import Schedule from './components/schedule/Schedule';
import Agenda from './components/agenda/Agenda';

const App = () => (
  <Router>
    <div>
      <Header />
      <div className="container">
        <br />
        <Route exact path="/" component={Schedule} />
        <Route path="/schedule" component={Schedule} />
        <Route path="/agenda" component={Agenda} />
      </div>

      <div style={{marginBottom: "70px"}}/>
    </div>
  </Router>
);

export default App;
