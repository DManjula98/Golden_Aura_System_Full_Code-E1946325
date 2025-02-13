import React from "react";
import { BsStarFill } from "react-icons/bs";
import { BsStar } from "react-icons/bs";
import { BsStarHalf } from "react-icons/bs";

const RatingTemp = ({ rating }) => {
  if (rating === 5) {
    return (
      <>
        <span className="text-[#EDBB0E]">
          <BsStarFill />
        </span>
        <span className="text-[#EDBB0E]">
          <BsStarFill />
        </span>
        <span className="text-[#EDBB0E]">
          <BsStarFill />
        </span>
        <span className="text-[#EDBB0E]">
          <BsStarFill />
        </span>
        <span className="text-[#EDBB0E]">
          <BsStarFill />
        </span>
      </>
    );
  } else if (rating === 4.5) {
    return (
      <>
        <span className="text-[#EDBB0E]">
          <BsStarFill />
        </span>
        <span className="text-[#EDBB0E]">
          <BsStarFill />
        </span>
        <span className="text-[#EDBB0E]">
          <BsStarFill />
        </span>
        <span className="text-[#EDBB0E]">
          <BsStarFill />
        </span>
        <span className="text-[#EDBB0E]">
          <BsStarHalf />
        </span>
      </>
    );
  } else if (rating === 4) {
    return (
      <>
        <span className="text-[#EDBB0E]">
          <BsStarFill />
        </span>
        <span className="text-[#EDBB0E]">
          <BsStarFill />
        </span>
        <span className="text-[#EDBB0E]">
          <BsStarFill />
        </span>
        <span className="text-[#EDBB0E]">
          <BsStarFill />
        </span>
        <span className="text-slate-600">
          <BsStar />
        </span>
      </>
    );
  } else if (rating === 3.5) {
    return (
      <>
        <span className="text-[#EDBB0E]">
          <BsStarFill />
        </span>
        <span className="text-[#EDBB0E]">
          <BsStarFill />
        </span>
        <span className="text-[#EDBB0E]">
          <BsStarFill />
        </span>
        <span className="text-[#EDBB0E]">
          <BsStarHalf />
        </span>
        <span className="text-slate-600">
          <BsStar />
        </span>
      </>
    );
  } else if (rating === 3) {
    return (
      <>
        <span className="text-[#EDBB0E]">
          <BsStarFill />
        </span>
        <span className="text-[#EDBB0E]">
          <BsStarFill />
        </span>
        <span className="text-[#EDBB0E]">
          <BsStarFill />
        </span>
        <span className="text-slate-600">
          <BsStar />
        </span>
        <span className="text-slate-600">
          <BsStar />
        </span>
      </>
    );
  } else if (rating === 2.5) {
    return (
      <>
        <span className="text-[#EDBB0E]">
          <BsStarFill />
        </span>
        <span className="text-[#EDBB0E]">
          <BsStarFill />
        </span>
        <span className="text-[#EDBB0E]">
          <BsStarHalf />
        </span>
        <span className="text-slate-600">
          <BsStar />
        </span>
        <span className="text-slate-600">
          <BsStar />
        </span>
      </>
    );
  } else if (rating === 2) {
    return (
      <>
        <span className="text-[#EDBB0E]">
          <BsStarFill />
        </span>
        <span className="text-[#EDBB0E]">
          <BsStarFill />
        </span>
        <span className="text-slate-600">
          <BsStar />
        </span>
        <span className="text-slate-600">
          <BsStar />
        </span>
        <span className="text-slate-600">
          <BsStar />
        </span>
      </>
    );
  } else if (rating === 1.5) {
    return (
      <>
        <span className="text-[#EDBB0E]">
          <BsStarFill />
        </span>
        <span className="text-[#EDBB0E]">
          <BsStarHalf />
        </span>
        <span className="text-slate-600">
          <BsStar />
        </span>
        <span className="text-slate-600">
          <BsStar />
        </span>
        <span className="text-slate-600">
          <BsStar />
        </span>
      </>
    );
  } else if (rating === 1) {
    return (
      <>
        <span className="text-[#EDBB0E]">
          <BsStarFill />
        </span>
        <span className="text-slate-600">
          <BsStar />
        </span>
        <span className="text-slate-600">
          <BsStar />
        </span>
        <span className="text-slate-600">
          <BsStar />
        </span>
        <span className="text-slate-600">
          <BsStar />
        </span>
      </>
    );
  } else {
    return (
      <>
        <span className="text-slate-600">
          <BsStar />
        </span>
        <span className="text-slate-600">
          <BsStar />
        </span>
        <span className="text-slate-600">
          <BsStar />
        </span>
        <span className="text-slate-600">
          <BsStar />
        </span>
        <span className="text-slate-600">
          <BsStar />
        </span>
      </>
    );
  }
};

export default RatingTemp;
