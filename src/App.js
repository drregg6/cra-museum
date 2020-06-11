/*

TODOS:
= Pagination on Index page
    - https://www.digitalocean.com/community/tutorials/how-to-build-custom-pagination-with-react
    - npm install react-pagination
= Implement Painting page
= Styling
= Random artist on load
    - van Gogh, vermeer, picasso
= Search history
    - history reducer
    - history Component sidebar
    - if { length != 0 display history.slice(0,6) }
    - expand on separate page(?)

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
import Painting from './components/painting/painting';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Header />
          <div className="main">
            <Switch>
              <Route exact path='/' component={Index} />
              <Route exact path='/painting' component={Painting} />
            </Switch>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
