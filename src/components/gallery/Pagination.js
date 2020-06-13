import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Pagination = ({
  paintingsPerPage,
  totalPaintings,
  paginate
}) => {
  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(totalPaintings / paintingsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {
        pageNumbers.map(number => {
          return (
            <li key={number}>
              <Link to={`/gallery/${number}`} onClick={() => paginate(number)}>{number}</Link>
            </li>
          )
        })
      }
    </div>
  )
}

Pagination.propTypes = {
  paintingsPerPage: PropTypes.number,
  totalPaintings: PropTypes.number,
  paginate: PropTypes.func,
}

export default Pagination;