import React from 'react'
import './Pagination.css'

const Pagination = ({animePerPage,totalAnime,paginate}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalAnime / animePerPage); i++) {
        pageNumbers.push(i);
    }
  return (
    <div className='pages'>
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} href='!#' className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
    </div>
  )
}

export default Pagination