import React from "react";

const PaginationTwo = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 1) return null;

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisible = 3; // how many numbers to show before '...'

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first page
      pages.push(1);

      // Left ellipsis
      if (currentPage > maxVisible) {
        pages.push("...");
      }

      // Middle pages
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Right ellipsis
      if (currentPage < totalPages - (maxVisible - 1)) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center gap-2">
      {/* Previous Button */}
      <button
        className="px-3 cursor-pointer py-1 border rounded disabled:opacity-50 border-[var(--color-border)] dark:border-[var(--color-border)] text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {/* Page Numbers */}
      {generatePageNumbers().map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="px-2">
            ...
          </span>
        ) : (
          <button
            key={idx}
            className={`px-3 cursor-pointer py-1 border border-[var(--color-border)] dark:border-[var(--color-border)] text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] rounded ${
              currentPage === page ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        className="px-3 cursor-pointer py-1 border border-[var(--color-border)] dark:border-[var(--color-border)] rounded disabled:opacity-50 text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationTwo;
