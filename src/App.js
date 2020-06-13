/*

THANKS:
= Rijksmuseum API
= TraversyMedia for Pagination tutorial
    - https://www.youtube.com/watch?v=IYCa1F-OWmk

TODOS:
= Pagination on Index page
    - Cues as to which page you're on in pagination
= Styling
    - mobile

*/

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
import Painting from './components/painting/Painting';
import Gallery from './components/gallery/Gallery';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Header />
          <div className="main">
            <Switch>
              <Route exact path='/' component={Index} />
              <Route exact path='/gallery/:page' component={Gallery} />
              <Route exact path='/painting/:id' component={Painting} />
            </Switch>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
