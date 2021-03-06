import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/header/Header';
import Schedule from './components/schedule/Schedule';
import Agenda from './components/agenda/Agenda';
import Learn from './components/learn/Learn';
import Grades from './components/grades/Grades';
import Settings from './components/settings/Settings';

const App = () => (
  <Router basename={process.env.PUBLIC_URL + "/"}>
    <div>
      <Header />
      <div className="container main-content">
        <Route exact path="/" render={() => (
          <Schedule />
        )} />
        <Route path="/schedule" component={Schedule} />
        <Route path="/agenda" component={Agenda} />
        <Route path="/learn" component={Learn} />
        <Route path="/grades" component={Grades} />
        <Route path="/settings" component={Settings} />
      </div>

      <div style={{marginBottom: "70px"}}/>
    </div>
  </Router>
);

export default App;
