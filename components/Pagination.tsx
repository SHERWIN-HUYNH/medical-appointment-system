import React from "react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void; // Type for the function that handles page changes
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="p-4 flex items-center justify-between text-slate-600">
      <Button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed "
      >
        Prev
      </Button>
      <div className="flex items-center gap-2 text-sm">
        {[...Array(totalPages)].map((_, index) => (
          <Button
            key={index + 1}
            className={`px-2 h-4 rounded-sm ${
              currentPage === index + 1 ? "bg-blue-300" : "bg-slate-50"
            }`}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </div>
      <Button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed "
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
