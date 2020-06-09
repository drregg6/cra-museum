import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import Index from './components/homepage/Index';
import Users from './components/users/Users';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Header />
          <div className="main">
            <Switch>
              <Route exact path='/' component={Index} />
              <Route exact path='/users' component={Users} />
            </Switch>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
