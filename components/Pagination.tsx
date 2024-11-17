import React from 'react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void; // Type for the function that handles page changes
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div className="p-4 flex items-center justify-between text-slate-600">
      <Button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="py-3 px-3 w-7 h-7 rounded-md bg-slate-100 text-primary text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed "
      >
        &lt;
      </Button>
      <div className="flex items-center gap-2 text-sm">
        {[...Array(totalPages)].map((_, index) => (
          <Button
            key={index + 1}
            className={`px-3 py-3 w-5 h-5 rounded-sm ${
              currentPage === index + 1 ? 'bg-gradient-to-r from-[#00b5f1] to-[#00e0ff] text-white' : 'bg-slate-100 text-primary'
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
        className="py-3 px-3 w-7 h-7 rounded-md bg-slate-100 text-primary text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed "
      >
        &gt;
      </Button>
    </div>
  );
};

export default Pagination;
