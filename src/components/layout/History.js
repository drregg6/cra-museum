import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './history.module.scss';
import utilStyles from '../../styles/utils.module.scss';

import { connect } from 'react-redux';
import { deleteHistory } from '../../actions/history';

export const History = ({
  deleteHistory,
  history: { history, isLoading }
}) => {
  const [ expand, toggleExpand ] = useState(false);
  const render = isLoading ? ('') : expand ? (
    history.map(painter => {
      return <li className={styles.item}>{painter}</li>
    })
  ) : (
    history.slice(0,5).map(painter => {
      return <li className={styles.item}>{painter}</li>
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
                className={`${utilStyles.button} ${styles.button}`}
                onClick={() => toggleExpand(!expand)}
              >
                { expand ? 'Less' : 'More' }
              </button>
            )
            }
            {
              history.length > 0 && (
                <button
                  className={`${utilStyles.button}`}
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
  deleteHistory: PropTypes.func.isRequired,
  history: PropTypes.object
}

const mapStateToProps = state => ({
  history: state.history
})

export default connect(
  mapStateToProps,
  { deleteHistory }
)(History);