import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
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
    <div>
      <h1>{ painting.title }</h1>
      <img src={painting.webImage.url} alt={painting.title} style={{ width: '95vw', marginLeft: '-12.5rem', padding: 0 }} />
    </div>
  )
  return (
    <div>
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