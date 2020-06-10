import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchPaintings } from '../../actions/paintings';

const Index = ({
  fetchPaintings,
  paintings: { paintings, isLoading }
}) => {
  useEffect(() => {
    fetchPaintings();
  }, [fetchPaintings]);
  const render = isLoading ? (
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

Index.propTypes = {
  fetchPaintings: PropTypes.func.isRequired,
  paintings: PropTypes.object
}

const mapStateToProps = state => ({
  paintings: state.paintings
});

export default connect(
  mapStateToProps,
  { fetchPaintings }
)(Index);