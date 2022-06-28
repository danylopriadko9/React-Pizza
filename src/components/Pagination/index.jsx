import React from 'react';
import ReactPaginate from 'react-paginate';
import style from './Pagination.module.scss';

const Pagination = ({ onChangePage, currentPage }) => {
  return (
    <div className='root'>
      <ReactPaginate
        className={style.root}
        breakLabel='...'
        nextLabel='>'
        onPageChange={(e) => onChangePage(e.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel='<'
        renderOnZeroPageCount={null}
        forcePage={currentPage - 1}
      />
    </div>
  );
};

export default Pagination;
