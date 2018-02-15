import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/header/Header';
import Schedule from './components/schedule/Schedule';

const App = () => (
  <Router>
    <div>
      <Header />
      <div className="container">
        <Route exact path="/" component={Schedule} />
        <Route path="/schedule" component={Schedule} />
      </div>
    </div>
  </Router>
);

export default App;
