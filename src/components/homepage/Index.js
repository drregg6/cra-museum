import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';

const Index = () => {
  const [ paintings, updatePaintings ] = useState([])
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`https://www.rijksmuseum.nl/api/en/collection?key=nxwxKjwi&involvedMaker=Rembrandt+van+Rijn`);
      if (res.data.artObjects) {
        updatePaintings([...res.data.artObjects])
      }
    }
    fetchData();
  }, []);
  if (paintings) {
    console.log(paintings);
  }
  const render = paintings.length === 0 ? (
    'Still loading'
  ) : (
    paintings.map(obj => {
      return (
        <div key={obj.id}>
          <h1>{obj.title}</h1>
          <img src={obj.webImage.url} alt="" style={{
            width: '50vw'
          }} />
        </div>
      )
    })
  )
  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <div>
        { render }
      </div>
    </div>
  )
}

// Index.propTypes = {

// }

export default Index;