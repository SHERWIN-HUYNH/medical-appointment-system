'use client'

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import { ChevronDown, ChevronUp, ChevronsUpDown, Search } from 'lucide-react'
import Pagination from './Pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey: string
  filterOptions?: {
    key: string
    options: { label: string; value: string }[]
    placeholder: string
  }
  showSTT?: boolean
  initialState?: {
    pagination?: {
      pageSize?: number
    }
  }
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  filterOptions,
  showSTT = true,
  initialState,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const sttColumn: ColumnDef<TData, TValue> = {
    id: 'stt',
    header: 'STT',
    enableSorting: false,
    cell: ({ row }) => {
      const pageIndex = table.getState().pagination.pageIndex
      const pageSize = table.getState().pagination.pageSize
      return pageIndex * pageSize + row.index + 1
    },
  }

  const allColumns = showSTT ? [sttColumn, ...columns] : columns

  const table = useReactTable({
    data,
    columns: allColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 5,
        ...initialState?.pagination,
      },
    },
  })

  const handleFilter = (value: string) => {
    if (value === 'all') {
      table.getColumn(filterOptions?.key || '')?.setFilterValue(undefined)
    } else {
      table.getColumn(filterOptions?.key || '')?.setFilterValue([value])
    }
  }

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex flex-1 items-center space-x-2">
            <div className="relative w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Tìm kiếm theo tên"
                value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
                onChange={(event) =>
                  table.getColumn(searchKey)?.setFilterValue(event.target.value)
                }
                className="pl-8 w-full rounded-xl border-slate-200 focus-visible:ring-slate-200"
                customProp={''}
              />
            </div>
          </div>

          {filterOptions && (
            <div className="flex items-center gap-2">
              <Select onValueChange={handleFilter}>
                <SelectTrigger className="w-[180px] border-slate-500 focus-visible:ring-0 focus:ring-0">
                  <SelectValue placeholder={filterOptions.placeholder} />
                </SelectTrigger>
                <SelectContent className="border-slate-500">
                  <SelectItem
                    value="all"
                    className="bg-white hover:bg-primary hover:text-white text-slate-700 cursor-pointer transition-all duration-100"
                  >
                    Tất cả
                  </SelectItem>
                  {filterOptions.options.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="bg-white hover:bg-primary hover:text-white text-slate-700 cursor-pointer transition-all duration-100"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-auto rounded-xl border border-slate-200 shadow-lg mb-16">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-slate-50 hover:bg-slate-50">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="h-12 px-4 text-white bg-primary font-medium first:rounded-tl-xl last:rounded-tr-xl"
                    >
                      {header.isPlaceholder ? null : (
                        <div className="flex items-center gap-2">
                          {header.column.getCanSort() ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="-ml-3 h-8 hover:bg-sky-500"
                              onClick={() => header.column.toggleSorting()}
                            >
                              <span>
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                              </span>
                              <span className="ml-2">
                                {{
                                  asc: <ChevronUp className="h-4 w-4" />,
                                  desc: <ChevronDown className="h-4 w-4" />,
                                }[header.column.getIsSorted() as string] ?? (
                                  <ChevronsUpDown className="h-4 w-4 opacity-50" />
                                )}
                              </span>
                            </Button>
                          ) : (
                            <div className="px-1">
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, i) => (
                  <TableRow
                    key={row.id}
                    className={cn(
                      'border-slate-200 hover:bg-blue-100 cursor-pointer',
                      i === table.getRowModel().rows.length - 1 && 'last:rounded-b-xl',
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-4 py-3 max-w-[200px]">
                        <div className="truncate">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-slate-500"
                  >
                    Không có dữ liệu
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-white">
        <Pagination
          currentPage={table.getState().pagination.pageIndex + 1}
          totalPages={table.getPageCount()}
          onPageChange={(page) => table.setPageIndex(page - 1)}
        />
      </div>
    </div>
  )
}

export default Table
