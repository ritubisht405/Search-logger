import React from "react";
import './pagination.css';


function Pagination({ nPages, currentPage, setCurrentPage }) {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);
  const nextPageHandler = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const PreviousPageHandler = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  return (
    <div>
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <button className="page-link" onClick={PreviousPageHandler}>
            {"<<"}
          </button>
        </li>

        {pageNumbers.map((pageNum) => (
          <li
            key={pageNum}
            className={`page-item ${currentPage === pageNum ? "active" : ""}`}
          >
            <button
              onClick={() => setCurrentPage(pageNum)}
              className="page-link"
            >
              {currentPage===pageNum?<strong>{pageNum}</strong>:pageNum }
            </button>
          </li>
        ))}

        <li className="page-item">
          <button className="page-link" onClick={nextPageHandler}>
            {">>"}
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;