import React from 'react';
import PropTypes from 'prop-types';

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
              <span onClick={() => paginate(number)}>{number}</span>
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