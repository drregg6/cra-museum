import React from 'react';
import PropTypes from 'prop-types';
import styles from './card.module.scss';
import { Link } from 'react-router-dom';
import { shortenTitle } from '../../utils/strHelper';

const Card = ({
  id,
  desc,
  title,
  image,
  painter
}) => {
  if (painter === 'anonymous') {
    painter = 'Anonymous';
  }
  return (
    <div className={styles.card}>
      <Link to={`/painting/${id}`}>
        <img src={image.url} alt={desc} />
      </Link>
      <Link to={`/painting/${id}`}>
        <h1>{shortenTitle(title)}</h1>
      </Link>
      <h2>{painter}</h2>
    </div>
  )
}

Card.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string,
  painter: PropTypes.string,
  image: PropTypes.object
}

export default Card;