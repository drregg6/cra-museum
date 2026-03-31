import React from 'react';
import { Link } from 'react-router-dom';
import styles from './nav.module.scss';
// import PropTypes from 'prop-types';

import Search from './Search';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.title}>
        <Link to="/">The Museum</Link>
      </div>
      <Search />
    </nav>
  )
}

// Nav.propTypes = {

// }

export default Nav;