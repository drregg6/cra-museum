import React from 'react';
import { Link } from 'react-router-dom';
import styles from './nav.module.scss';
// import PropTypes from 'prop-types';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.title}>
        <Link to="/">Home</Link>
      </div>
      <input type="text" placeholder="Search" />
    </nav>
  )
}

// Nav.propTypes = {

// }

export default Nav;