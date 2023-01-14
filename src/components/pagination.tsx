import React from "react";

interface Paginatiion {
  noOfPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

function Pagination(pagination: Paginatiion) {
  const { noOfPages, currentPage, setCurrentPage } = pagination;
  const pageNumbers = Array.from(Array(noOfPages + 1).keys()).slice(1);
  const nextPage = () => {
    if (currentPage !== noOfPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <button onClick={prevPage}>Previous</button>
        </li>
        {pageNumbers.map(pgNumber => (
          <li
            key={pgNumber}
            className={`page-item ${currentPage === pgNumber ? "active" : ""} `}
          >
            <button onClick={() => setCurrentPage(pgNumber)}>{pgNumber}</button>
          </li>
        ))}
        <li className="page-item">
          <button onClick={nextPage}>Next</button>
        </li>
      </ul>
    </nav>
  );
}
export default Pagination;
