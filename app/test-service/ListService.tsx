'use client'
import ModalDelete from '@/components/ModalDelete'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { Button } from '@/components/ui/button'
import { ArrowDownNarrowWide, Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Service = {
  id: string
  name: string
  price: number
  facultyId: string
  description: string
}

type Faculty = {
  id: string
  name: string
}

const columns = [
  {
    header: 'STT',
    accessor: 'index',
    className: 'w-[5%] hidden md:table-cell',
  },
  {
    header: 'Dịch vụ',
    accessor: 'service',
    className: 'w-[20%] text-left pl-7 hidden md:table-cell ',
  },
  {
    header: 'Giá dịch vụ',
    accessor: 'price',
    className: 'w-[20%] text-left pl-7 hidden md:table-cell ',
  },
  {
    header: 'Chuyên khoa',
    accessor: 'facultyName',
    className: 'w-[20%] text-left pl-7 hidden md:table-cell',
  },
  {
    header: 'Mô tả',
    accessor: 'description',
    className: 'w-[20%] text-left pl-7 hidden md:table-cell',
  },
  {
    header: 'Thao tác',
    accessor: 'actions',
    className: 'w-[20%] text-left pl-7 hidden md:table-cell',
  },
]

const ListService = () => {
  const [facultyData, setFacultyData] = useState<Faculty[]>([])
  const [serviceData, setServiceData] = useState<Service[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchServiceData = async () => {
      const response = await fetch(`/api/service`)

      if (response.ok) {
        const data = await response.json()
        setServiceData(data)
      }
    }

    const fetchFacultyData = async () => {
      const response = await fetch(`/api/faculty`)
      if (response.ok) {
        const data = await response.json()
        setFacultyData(data)
      }
    }

    fetchServiceData()
    fetchFacultyData()
  }, [])

  // Lọc dữ liệu dựa trên searchTerm
  const searchData = serviceData.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )
  // Phân trang
  const itemsPerPage = 5
  const totalPages = Math.ceil(searchData.length / itemsPerPage)

  const displayedData = searchData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  // Hàm tìm tên chuyên khoa từ facultyId
  const getFacultyName = (facultyId: string) => {
    // Tìm đối tượng chuyên khoa có id khớp với facultyId
    const faculty = facultyData.find((f) => f.id === facultyId)

    // Kiểm tra nếu faculty tồn tại
    if (faculty) {
      return faculty.name // Trả về tên của chuyên khoa nếu tìm thấy
    } else {
      return 'NULL' // Trả về "NULL" nếu không tìm thấy chuyên khoa
    }
  }
  // Tính toán số thứ tự dựa trên trang hiện tại
  const getSequentialNumber = (index: number) => {
    return (currentPage - 1) * itemsPerPage + index + 1
  }

  // Thêm dữ liệu STT vào displayedData
  const dataWithIndex = displayedData.map((item, index) => ({
    ...item,
    index: getSequentialNumber(index),
  }))

  const confirmDelete = async () => {
    if (!serviceToDelete) return

    try {
      const response = await fetch(`/api/service`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: serviceToDelete.id }),
      })

      if (response.ok) {
        setServiceData((prevData) =>
          prevData.filter((service) => service.id !== serviceToDelete.id),
        )
        toast.success(`Dịch vụ ${serviceToDelete.name} đã xóa thành công!`)
      } else {
        const message = await response.json()
        toast.error(message.error)
      }
    } catch (error) {
      console.error('Error deleting service:', error)
      toast.error('Đã xảy ra lỗi khi xóa dịch vụ!')
    } finally {
      setServiceToDelete(null)
      setShowModal(false)
    }
  }

  const renderRow = (item: Service & { index: number }) => {
    return (
      <tr
        key={item.id}
        className="h-15 border-b border-slate-200 even:bg-slate-50 text-sm hover:bg-blue-50"
      >
        <td className="text-center p-4">{item.index}</td>
        <td className="text-left pl-7 hidden md:table-cell">{item.name}</td>
        <td className="text-left pl-7 hidden md:table-cell">{item.price}</td>
        <td className="text-left pl-7 hidden md:table-cell">
          {getFacultyName(item.facultyId)}
        </td>
        <td className="text-left pl-7 hidden md:table-cell">{item.description}</td>
        <td className="pl-7">
          <div className="flex items-center gap-2">
            <Link href={`/test-service/edit-service?id=${item.id}`}>
              <Button className="w-12 h-10 flex items-center justify-center rounded-full bg-blue-300">
                <Pencil size={28} strokeWidth={3} color="white" />
              </Button>
            </Link>
            <Button
              className="w-12 h-10 flex items-center justify-center rounded-full bg-purple-300"
              onClick={() => {
                setServiceToDelete(item)
                setShowModal(true)
              }}
            >
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
          <TableSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
        <Table columns={columns} renderRow={renderRow} data={dataWithIndex} />
      </div>
      <div className="">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage} // Pass the function to update current page
        />
      </div>
      {showModal && (
        <ModalDelete
          showModal={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={confirmDelete}
          label={`dịch vụ ${serviceToDelete?.name}`}
        />
      )}
    </div>
  )
}

export default ListService
