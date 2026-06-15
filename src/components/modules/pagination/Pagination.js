import React from "react";
import ButtonPage from "./ButtonPage";

function Pagination({ totalPages, currentPage }) {
  return (
    <div className="flex items-center justify-center gap-x-2">
      {Array.from({ length: totalPages }).map((_, index) => {
        return (
          <ButtonPage
            currentPage={currentPage}
            key={index + 1}
            value={index + 1}
          />
        );
      })}
    </div>
  );
}

export default Pagination;
