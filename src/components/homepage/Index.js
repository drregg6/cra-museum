/*

https://data.rijksmuseum.nl/object-metadata/api/
https://www.rijksmuseum.nl/en/search/advanced

The purpose of Index
= Render data from store onto Index

*/

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';

import Pagination from './Pagination';

import { connect } from 'react-redux';

const Index = ({
  paintings: { paintings, isLoading }
}) => {
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ paintingsPerPage, setPaintingsPerPage ] = useState(12);

  const indexOfLastPainting = currentPage * paintingsPerPage;
  const indexOfFirstPainting = indexOfLastPainting - paintingsPerPage;
  const currentPaintings = paintings.slice(indexOfFirstPainting, indexOfLastPainting);

  const render = !isLoading && (
    currentPaintings.map(painting => {
      return (
        <div key={painting.id} className={styles.painting}>
          <Link to={`/painting/${painting.objectNumber}`}>
            <h1>{painting.title}</h1>
            <img src={painting.webImage.url} alt="" />
            <h2>{painting.principalOrFirstMaker}</h2>
          </Link>
        </div>
      )
    })
  )

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className={styles.homepage}>
      {
        isLoading && (
          <p>Search for an artist in the searchbox above!</p>
        )
      }
      <div className={styles.paintings}>
        { render }
      </div>
      {
        !isLoading && (
          <Pagination
            paintingsPerPage={paintingsPerPage}
            totalPaintings={paintings.length}
            paginate={paginate}
          />
        )
      }
    </div>
  )
}

Index.propTypes = {
  paintings: PropTypes.object
}

const mapStateToProps = state => ({
  paintings: state.paintings
});

export default connect(
  mapStateToProps,
  null
)(Index);