/*

https://data.rijksmuseum.nl/object-metadata/api/
https://www.rijksmuseum.nl/en/search/advanced

The purpose of Index
= Render data from store onto Index

*/

import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

import Loader from '../loader/Loader';

import { connect } from 'react-redux';

const Index = ({
  paintings: { paintings, isLoading }
}) => {
  const render = isLoading ? (
    <Loader />
  ) : (
    paintings.map(painting => {
      return (
        <div key={painting.id} className={styles.painting}>
          <h1>{painting.title}</h1>
          <img src={painting.webImage.url} alt="" />
          <h2>{painting.principalOrFirstMaker}</h2>
        </div>
      )
    })
  )
  return (
    <div className={styles.paintings}>
      { render }
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