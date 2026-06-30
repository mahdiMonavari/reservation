import React from "react";
import ButtonPage from "./ButtonPage";

const SIBLINGS = 1;

function Pagination({ totalPages, currentPage }) {
  console.log(currentPage);
  const pages = [];
  const start = Math.max(1, currentPage - SIBLINGS);
  const end = Math.min(totalPages, currentPage + SIBLINGS);
  if (start > 1) {
    pages.push(1);
    if (start > 2) {
      pages.push("...");
    }
  }
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  if (totalPages > end) {
    if (totalPages - 1 > end) {
      pages.push("...");
    }
    pages.push(totalPages);
  }
  return (
    <div className="flex items-center justify-center gap-x-2">
      {console.log(pages)}
      {pages.map((page, index) =>
        page === "..." ? (
          <span key={`dots-${index}`} className="px-2 text-slate-400">
            ...
          </span>
        ) : (
          <ButtonPage key={page} currentPage={currentPage} value={page} />
        )
      )}
    </div>
  );
}

export default Pagination;
