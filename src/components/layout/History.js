import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

export const History = ({
  history: { history, isLoading }
}) => {
  const render = isLoading ? ('') : (
    history.map(painter => {
      return <li>{painter}</li>
    })
  )
  return (
    <ul>
      { render }
    </ul>
  )
}

History.propTypes = {
  history: PropTypes.object
}

const mapStateToProps = state => ({
  history: state.history
})

export default connect(
  mapStateToProps,
  null
)(History);