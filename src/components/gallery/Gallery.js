import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './gallery.module.scss';
import { Link } from 'react-router-dom';

import Pagination from './Pagination';
import Loader from '../loader/Loader';

import { connect } from 'react-redux';

const Gallery = ({
  paintings: { paintings, isLoading }
}) => {
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ paintingsPerPage ] = useState(12);

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
    <div>
      {
        isLoading && (
          <Loader />
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

Gallery.propTypes = {
  paintings: PropTypes.object
}

const mapStateToProps = state => ({
  paintings: state.paintings
})

export default connect(
  mapStateToProps,
  null
)(Gallery);