import React from 'react'
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';

const Pagination = ({ pageNumber, setPageNumber, totalItem, perPage }) => {
    const totalPages = Math.ceil(totalItem / perPage);
  
    const handlePageChange = (page) => {
      setPageNumber(page);
    };
  
    return (
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={() => handlePageChange(pageNumber - 1)}
          disabled={pageNumber === 1}
          className={`px-4 py-2 rounded-md ${
            pageNumber === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-indigo-500 text-white"
          }`}
        >
          Previous
        </button>
  
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            onClick={() => handlePageChange(idx + 1)}
            className={`px-3 py-2 rounded-md ${
              pageNumber === idx + 1 ? "bg-indigo-500 text-white" : "bg-gray-200"
            }`}
          >
            {idx + 1}
          </button>
        ))}
  
        <button
          onClick={() => handlePageChange(pageNumber + 1)}
          disabled={pageNumber === totalPages}
          className={`px-4 py-2 rounded-md ${
            pageNumber === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-indigo-500 text-white"
          }`}
        >
          Next
        </button>
      </div>
    );
  };

export default Pagination