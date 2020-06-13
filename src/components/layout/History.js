import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './history.module.scss';
import utilStyles from '../../styles/utils.module.scss';
import { useHistory } from 'react-router-dom';
import { shortenToFifty } from '../../utils/strHelper';

import { connect } from 'react-redux';
import { fetchPaintings } from '../../actions/paintings';
import {
  addPainter,
  deleteHistory
} from '../../actions/history';

export const History = ({
  addPainter,
  fetchPaintings,
  deleteHistory,
  history: { history, isLoading }
}) => {
  const browserHistory = useHistory();
  const [ expand, toggleExpand ] = useState(false);
  const handleClick = (painter) => {
    fetchPaintings(painter);
    addPainter(painter);
    if (browserHistory.pathname !== `/gallery/1`) {
      browserHistory.push('/gallery/1');
    }
  }

  const render = isLoading ? ('') : expand ? (
    history.map(painter => {
      return (
        <li
          className={styles.item}
          onClick={() => handleClick(painter)}
        >
          {shortenToFifty(painter)}
        </li>
      )
    })
  ) : (
    history.slice(0,5).map(painter => {
      return (
        <li
          className={styles.item}
          onClick={() => handleClick(painter)}
        >
          {shortenToFifty(painter)}
        </li>
      )
    })
  )
  return (
    <div className={styles.history}>
      <ul className={styles.list}>
        { render }
      </ul>
      {
        history.length > 0 && (
        <div className={styles.buttons}>
          {
            history.length > 5 && (
              <button
                className={`${utilStyles.button} ${styles.expand} ${styles.button}`}
                onClick={() => toggleExpand(!expand)}
              >
                { expand ? 'Less' : 'More' }
              </button>
            )
            }
            {
              history.length > 0 && (
                <button
                  className={`${utilStyles.button} ${styles.button}`}
                  onClick={() => deleteHistory()}
                >
                  Delete History
                </button>
              )
            }
          </div>
          )
      }
    </div>
  )
}

History.propTypes = {
  fetchPaintings: PropTypes.func.isRequired,
  deleteHistory: PropTypes.func.isRequired,
  addPainter: PropTypes.func.isRequired,
  history: PropTypes.object
}

const mapStateToProps = state => ({
  history: state.history
})

export default connect(
  mapStateToProps,
  {
    addPainter,
    deleteHistory,
    fetchPaintings
  }
)(History);