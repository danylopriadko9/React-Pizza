import React from 'react';
import ReactPaginate from 'react-paginate';
import style from './Pagination.module.scss';

type PaginationProps = {
  onChangePage: (element: number) => void;
  currentPage: number;
};

const Pagination: React.FC<PaginationProps> = ({
  onChangePage,
  currentPage,
}) => {
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
        forcePage={currentPage - 1}
      />
    </div>
  );
};

export default Pagination;
