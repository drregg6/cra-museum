/*

The purpose of Search
= Get artist from user
= onSubmit, search for artist in Rijksmuseum database

*/

import React, { useState } from 'react';
import styles from './search.module.scss';
import utilStyles from '../../styles/utils.module.scss';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';
import { fetchPaintings } from '../../actions/paintings';
import { addPainter } from '../../actions/history';

const Search = ({
  fetchPaintings,
  addPainter
}) => {
  const [ input, setInput ] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = ev => {
    ev.preventDefault();
    
    fetchPaintings(input);
    addPainter(input);
    setInput('');

    navigate('/gallery/1');
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
        className={`${utilStyles.button} ${styles.input} ${styles.search}`}
      />
    </form>
  )
}

Search.propTypes = {
  fetchPaintings: PropTypes.func.isRequired
}

export default connect(
  null,
  {
    fetchPaintings,
    addPainter
  }
)(Search);