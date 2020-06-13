import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './painting.module.scss';
import { useParams } from 'react-router-dom';

import { connect } from 'react-redux';
import { fetchPainting } from '../../actions/painting';
import { addPainter } from '../../actions/history';

import Loader from '../loader/Loader';

const Painting = ({
  fetchPainting,
  addPainter,
  painting: { painting, isLoading }
}) => {
  const { id } = useParams();
  useEffect(() => {
    fetchPainting(id);
  }, [fetchPainting, id]);
  if (painting) {
    addPainter(painting.title);
  }

  const render = isLoading ? (
    <Loader />
  ) : (
    <>
      <h1>{ painting.title }</h1>
      <img src={painting.webImage.url} alt={painting.title} />
    </>
  )
  return (
    <div className={styles.painting}>
      { render }
    </div>
  )
}

Painting.propTypes = {
  fetchPainting: PropTypes.func.isRequired,
  addPainter: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  painting: PropTypes.object
}

const mapStateToProps = state => ({
  painting: state.painting
});

export default connect(
  mapStateToProps,
  {
    fetchPainting,
    addPainter
  }
)(Painting);