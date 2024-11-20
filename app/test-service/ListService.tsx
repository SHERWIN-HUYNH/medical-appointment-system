'use client'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { Button } from '@/components/ui/button'
import { facultyData, serviceData } from '@/lib/data'
import { ArrowDownNarrowWide, Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

type Service = {
  id: number
  name: string
  price: number
  facultyId: number
  description: string
}

const columns = [
  {
    header: 'ID',
    accessor: 'id',
    className: 'hidden lg:table-cell ',
  },
  {
    header: 'Dịch vụ',
    accessor: 'service',
  },
  {
    header: 'Giá dịch vụ',
    accessor: 'price',
  },
  {
    header: 'Chuyên khoa',
    accessor: 'facultyName',
  },
  {
    header: 'Mô tả',
    accessor: 'description',
    className: 'hidden md:table-cell ',
  },
]

const ListService = () => {
  // Phân trang
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(serviceData.length / itemsPerPage)

  const displayedData = serviceData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  // Hàm tìm tên chuyên khoa từ facultyId
  const getFacultyName = (facultyId: number) => {
    // Tìm đối tượng chuyên khoa có id khớp với facultyId
    const faculty = facultyData.find((f) => f.id === facultyId)

    // Kiểm tra nếu faculty tồn tại
    if (faculty) {
      return faculty.name // Trả về tên của chuyên khoa nếu tìm thấy
    } else {
      return 'NULL' // Trả về "NULL" nếu không tìm thấy chuyên khoa
    }
  }

  const renderRow = (item: Service) => {
    return (
      <tr
        key={item.id}
        className="h-15 border-b text-left border-slate-200 even:bg-slate-50 text-sm hover:bg-blue-50"
      >
        <td>
          <div className="text-left p-2">
            <h3 className="font-semi">{item.id}</h3>
          </div>
        </td>
        <td className="hidden md:table-cell text-left">{item.name}</td>
        <td className="hidden md:table-cell text-left">{item.price}</td>
        <td className="hidden md:table-cell text-left">
          {getFacultyName(item.facultyId)}
        </td>
        <td className="hidden md:table-cell text-left">{item.description}</td>
        <td>
          <div className="flex items-center gap-2">
            <Link href={`/test-faculty/${item.id}/edit-faculty`}>
              <Button className="w-12 h-10 flex items-center justify-center rounded-full bg-blue-300">
                <Pencil size={28} strokeWidth={3} color="white" />
              </Button>
            </Link>
            <Button className="w-12 h-10 flex items-center justify-center rounded-full bg-purple-300">
              <Trash2 size={28} strokeWidth={3} color="white" />
            </Button>
          </div>
        </td>
      </tr>
    )
  }
  return (
    <div className="bg-white shadow-xl p-4 rounded-md flex-1 mt-0 h-screen">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold text-primary">
          All Service
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
        </div>
        <div className="flex items-center gap-4 self-end">
          <Link href="/test-service/add-service">
            <Button className="flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-400 text-white">
              Thêm dịch vụ
            </Button>
          </Link>
          <Button className="flex items-center justify-center rounded-full bg-gradient-to-r from-blue-300 to-cyan-300 text-white">
            <ArrowDownNarrowWide className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="">
        <Table columns={columns} renderRow={renderRow} data={displayedData} />
      </div>
      <div className="">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage} // Pass the function to update current page
        />
      </div>
    </div>
  )
}

export default ListService
