/*

THANKS:
= Rijksmuseum API
= TraversyMedia for Pagination tutorial
    - https://www.youtube.com/watch?v=IYCa1F-OWmk

TODOS:
= Clicking History item will not push to /gallery/1

*/

import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Routes,
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
            <Routes>
              <Route exact path='/' element={<Index />} />
              <Route exact path='/gallery/:page' element={<Gallery />} />
              <Route exact path='/painting/:id' element={<Painting />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
