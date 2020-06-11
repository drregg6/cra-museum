import React, { useState } from 'react';
import styles from './search.module.scss';
import utilStyles from '../../styles/utils.module.scss';
// import PropTypes from 'prop-types';

const Search = () => {
  const [ input, setInput ] = useState('');

  
  const handleSubmit = ev => {
    ev.preventDefault();
    console.log(input);
    setInput('');
  }
  return (
    <form
      onSubmit={(ev) => handleSubmit(ev)}
      className={styles.form}
    >
      <input
        type="text"
        placeholder="Artist / Painting"
        value={input}
        onChange={ev => setInput(ev.target.value)}
        className={`${styles.searchBar} ${styles.input}`}
      />
      <input
        type="submit"
        value="Search"
        className={`${utilStyles.button} ${styles.input}`}
      />
    </form>
  )
}

// Search.propTypes = {

// }

export default Search;