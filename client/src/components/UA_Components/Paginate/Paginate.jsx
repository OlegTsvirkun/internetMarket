import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Paginate.module.scss';

export const Paginate = ({forcePage,onChange,totalPages}) =>{

  return (
 
    <ReactPaginate
    className={styles.paginate}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e)=>onChange(e.selected+1)}
        pageRangeDisplayed={3}
        forcePage={forcePage}
        pageCount={totalPages}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
 
)};

