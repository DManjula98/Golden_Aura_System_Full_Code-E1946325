import React from "react";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";

const Pagination = ({
  pageNumber,
  setPageNumber,
  totalItem,
  parPage,
  showItem,
}) => {
  let totalPage = Math.ceil(totalItem / parPage);
  let startPage = pageNumber;

  let dif = totalPage - pageNumber;

  if (dif <= showItem) {
    startPage = totalPage - showItem;
  }
  let endPage = startPage < 0 ? showItem : showItem + startPage;
  if (startPage <= 0) {
    startPage = 1;
  }

  const createBtn = () => {
    const btns = [];
    for (let i = startPage; i <= endPage; i++) {
      if (i <= totalPage) {
        btns.push(
          <li
            key={i}
            className={`${
              pageNumber === i
                ? "bg-indigo-500 shadow-lg shadow-indigo-500/50 text-white"
                : "bg-slate-700 hover:bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 hover:text-white text-[#d0d2d6]"
            } w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer`}
            onClick={() => setPageNumber(i)}
          >
            {i}
          </li>
        );
      }
    }

    return btns;
  };

  return (
    <ul className="flex gap-3">
      {pageNumber > 1 && (
        <li
          className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-700 text-[#d0d2d6] cursor-pointer"
          onClick={() => setPageNumber(pageNumber - 1)}
        >
          <BsChevronDoubleLeft />
        </li>
      )}
      {createBtn()}
      {pageNumber < totalPage && (
        <li
          className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-700 text-[#d0d2d6] cursor-pointer"
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          <BsChevronDoubleRight />
        </li>
      )}
    </ul>
  );
};

export default Pagination;
