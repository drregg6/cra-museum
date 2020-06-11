import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchPainting } from '../../actions/painting';

import Loader from '../loader/Loader';

const Painting = ({
  fetchPainting,
  painting: { painting, isLoading }
}) => {
  console.log(painting);
  useEffect(() => {
    fetchPainting();
  }, [fetchPainting]);

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
      <h1>Hello world!</h1>
      { render }
    </div>
  )
}

Painting.propTypes = {
  fetchPainting: PropTypes.func.isRequired,
  painting: PropTypes.object
}

const mapStateToProps = state => ({
  painting: state.painting
});

export default connect(
  mapStateToProps,
  { fetchPainting }
)(Painting);