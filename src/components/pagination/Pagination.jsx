import "./Pagination.css";

/**
 * Pagination component for navigating through pages.
 *
 * @param {Object} props - The props object.
 * @param {number} props.currentPage - The current active page number.
 * @param {Function} props.setCurrentPage - Function to update the current page number.
 * @param {number} props.totalPages - The total number of pages available.
 * @returns {JSX.Element} The rendered Pagination component.
 */
function Pagination({ currentPage, setCurrentPage, totalPages }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const goTo = (n) => {
    setCurrentPage(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="pagination">
      <button
        className="pagination-arrow"
        disabled={currentPage === 1}
        onClick={() => goTo(currentPage - 1)}
      >
        &lt;
      </button>

      <ul className="page-numbers">
        {pageNumbers.map((n) => (
          <li
            key={n}
            className={`page-number ${n === currentPage ? "active" : ""}`}
            onClick={() => goTo(n)}
          >
            {n}
          </li>
        ))}
      </ul>

      <button
        className="pagination-arrow"
        disabled={currentPage === totalPages}
        onClick={() => goTo(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  );
}

export default Pagination;
