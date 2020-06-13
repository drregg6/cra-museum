import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './gallery.module.scss';

import Card from './Card';
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
      {
        (!isLoading && paintings.length === 0) && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            Sorry, can't find anything for that search.
          </div>
        )
      }
      {
        !isLoading && (
          <Pagination
            paintingsPerPage={paintingsPerPage}
            totalPaintings={paintings.length}
            paginate={paginate}
          />
        )
      }
      <div className={styles.paintings}>
        {
          (!isLoading) && (
            currentPaintings.map(painting => {
              const { objectNumber, id, longTitle, title, webImage, principalOrFirstMaker } = painting;
              return (
                <Card
                  key={id}
                  desc={longTitle}
                  id={objectNumber}
                  title={title}
                  image={webImage}
                  painter={principalOrFirstMaker}
                />
              )
            })
          )
        }
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