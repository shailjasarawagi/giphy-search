import React from "react";

interface PaginationProps {
  currentPage: number;
  onPageChange: (newPage: number) => void;
  isNextDisabled: boolean;
}

const Pagination: React.FC<PaginationProps> = React.memo(
  ({ currentPage, onPageChange, isNextDisabled }) => {
    return (
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <span>&#8592; {/* Left Arrow */}</span>
        </button>
        {/* <button> */}
        <span className="pagination-current">{currentPage}</span>
        {/* </button> */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isNextDisabled}
        >
          <span>&#8594; {/* Right Arrow */}</span>
        </button>
      </div>
    );
  }
);

export default Pagination;
