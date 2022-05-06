import React from 'react';

const Pagination = ({ patientsPerPage, totalPatients, paginate, currentPage, prevPage, nextPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPatients / patientsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-end align-items-center">
          <li className="caption">Scorri pagine</li>
          
          {currentPage > 1 ? <li className="page-item" onClick={() => prevPage(currentPage)}><a className="page-link prev" href='#'>Previous</a></li> : <li className="page-item disabled"><a className="page-link prev" href='#'>Previous</a></li>}
          <li className="page-item"><span className="current-page">{currentPage}/{pageNumbers.length}</span></li>
          
          {currentPage < pageNumbers[pageNumbers.length - 1] ? <li className="page-item" onClick={() => nextPage(currentPage)}><a className="page-link next" href="#">Next</a></li> : <li className="page-item disabled"><a className="page-link next" href="#">Next</a></li>}
        </ul>
      </nav>
      {/* <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} href='#' className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav> */}
      </>
  );
};

export default Pagination;