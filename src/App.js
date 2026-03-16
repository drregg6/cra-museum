/*

THANKS:
= Rijksmuseum API
= TraversyMedia for Pagination tutorial
    - https://www.youtube.com/watch?v=IYCa1F-OWmk

TODOS:
= New API Docs: https://api.artic.edu/docs/#introduction
= Chicago Endpoint: https://api.artic.edu/api/v1/artworks
  - Example search: https://api.artic.edu/api/v1/artworks/search?params=%7B%22q%22%3A%22cats%22%2C%22query%22%3A%7B%22term%22%3A%7B%22is_public_domain%22%3Atrue%7D%7D%7D
    * {"q":"cats","query":{"term":{"is_public_domain":true}}}
  - https://api.artic.edu/api/v1/artworks/search?q=<term>&query[term][is_public_domain]=true&limit=2&fields=id,title,image_id
    * Expand limit for more
  - https://api.artic.edu/api/v1/artworks/<id>?fields=id,title,place_of_origin,medium_display,publication_history
= IIIF Image Endpoint: data.config.iiif_url in return (https://www.artic.edu/iiif/2)
  - Append data.image_id
  - Then some more configs: /full/843,/0/default.jpg

*/

import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
							<Route exact path="/" element={<Index />} />
							<Route
								exact
								path="/gallery/:page"
								element={<Gallery />}
							/>
							<Route
								exact
								path="/painting/:id"
								element={<Painting />}
							/>
						</Routes>
					</div>
				</div>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
