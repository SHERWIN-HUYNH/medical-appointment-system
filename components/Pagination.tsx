import React from 'react'
import { Button } from '@/components/ui/button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void // Type for the function that handles page changes
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const renderPageNumbers = () => {
    const pages = []

    // Luôn hiển thị trang đầu
    if (currentPage > 3) {
      pages.push(
        <Button
          key={1}
          onClick={() => onPageChange(1)}
          className={`px-3 py-3 w-8 h-8 rounded-md text-xs font-semibold ${
            currentPage === 1
              ? 'bg-gradient-to-r from-[#00b5f1] to-[#00e0ff] text-white'
              : 'bg-slate-100 text-primary'
          }`}
        >
          1
        </Button>,
      )

      // Thêm dấu ...
      if (currentPage > 4) {
        pages.push(
          <span key="ellipsis1" className="px-3 w-8 h-8">
            ...
          </span>,
        )
      }
    }

    // Hiển thị các trang xung quanh trang hiện tại
    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(totalPages, currentPage + 2);
      i++
    ) {
      pages.push(
        <Button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-3 w-8 h-8 rounded-sm ${
            currentPage === i
              ? 'bg-gradient-to-r from-[#00b5f1] to-[#00e0ff] text-white'
              : 'bg-slate-100 text-primary'
          }`}
        >
          {i}
        </Button>,
      )
    }

    // Hiển thị dấu ... và trang cuối
    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) {
        pages.push(
          <span key="ellipsis2" className="px-2">
            ...
          </span>,
        )
      }
      pages.push(
        <Button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`px-3 py-3 w-8 h-8 rounded-sm ${
            currentPage === totalPages
              ? 'bg-gradient-to-r from-[#00b5f1] to-[#00e0ff] text-white'
              : 'bg-slate-100 text-primary'
          }`}
        >
          {totalPages}
        </Button>,
      )
    }

    return pages
  }

  return (
    <div className="p-4 flex items-center justify-center gap-2 relative min-w-[300px]">
      <Button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="absolute left-0 py-3 px-3 w-8 h-8 rounded-md bg-slate-100 text-primary text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &lt;
      </Button>

      <div className="flex items-center gap-2 mx-12">{renderPageNumbers()}</div>

      <Button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="absolute right-0 py-3 px-3 w-8 h-8 rounded-md bg-slate-100 text-primary text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &gt;
      </Button>
    </div>
  )
}

export default Pagination
