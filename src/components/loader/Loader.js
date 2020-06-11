import React from 'react';
import styles from './loader.module.scss';
// import PropTypes from 'prop-types';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner}></div>
    </div>
  )
}

// Loader.propTypes = {

// }

export default Loader;