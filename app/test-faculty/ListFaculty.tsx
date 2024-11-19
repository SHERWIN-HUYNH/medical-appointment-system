'use client'
import React from 'react'
import ModalDelete from '@/components/ModalDelete'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import TableSearch from '@/components/TableSearch'

type Faculty = {
  id: string
  name: string
  description: string
}

const columns = [
  {
    header: 'STT',
    accessor: 'index',
    className: 'w-[5%]',
  },
  {
    header: 'Chuyên khoa',
    accessor: 'name',
    className: 'w-[30%]',
  },
  {
    header: 'Mô tả',
    accessor: 'description',
  },
  {
    header: 'Thao tác',
    accessor: 'actions',
  },
]

const ListFaculty = () => {
  const [facultyData, setFacultyData] = useState<Faculty[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const [showModal, setShowModal] = useState(false)
  const [facultyToDelete, setFacultyToDelete] = useState<Faculty | null>(null)
  const [message, setMessage] = useState('')
  const [fadeOut, setFadeOut] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchFaculties = async () => {
      setLoading(true)
      const response = await fetch(`api/faculty`)

      if (response.ok) {
        const data = await response.json()
        setFacultyData(data)
      } else {
        setError('Failed to fetch faculties')
      }
      setLoading(false)
    }

    fetchFaculties()
  }, [])

  // Lọc dữ liệu dựa trên searchTerm
  const searchData = facultyData.filter((faculty) =>
    faculty.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Tính toán số trang dựa trên dữ liệu đã tìm kiếm
  const totalPages = Math.ceil(searchData.length / itemsPerPage)

  // Lấy dữ liệu cho trang hiện tại từ dữ liệu đã tìm kiếm
  const displayedData = searchData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  // Reset về trang 1 khi searchTerm thay đổi
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  // Xử lý hiển thị thông báo
  const showMessage = (msg: string) => {
    setMessage(msg)
    setFadeOut(false)
    setTimeout(() => {
      setFadeOut(true)
    }, 2000)
  }

  // Xử lý xóa chuyên khoa
  const handleDelete = (faculty: Faculty) => {
    setFacultyToDelete(faculty)
    setShowModal(true)
  }

  // Xử lý xác nhận xóa
  const confirmDelete = async () => {
    if (!facultyToDelete) return

    const response = await fetch(`/api/faculty`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ faculty: facultyToDelete }),
    })

    if (response.ok) {
      // Cập nhật state sau khi xóa thành công
      setFacultyData((prevData) =>
        prevData.filter((faculty) => faculty.id !== facultyToDelete.id),
      )
      showMessage(`Chuyên khoa ${facultyToDelete.name} đã xóa thành công!`)
    } else {
      showMessage('Không thể xóa chuyên khoa!')
    }

    // Reset trạng thái
    setFacultyToDelete(null)
    setShowModal(false)
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

  // Render hàng trong bảng
  const renderRow = (item: Faculty & { index: number }) => (
    <tr
      key={item.id}
      className="h-15 border-b border-slate-200 even:bg-slate-50 text-sm hover:bg-blue-50"
    >
      <td className="text-center p-4">{item.index}</td>
      <td className="p-4">{item.name}</td>
      <td className="p-4 text-left">{item.description}</td>
      <td className="p-4">
        <div className="flex items-center justify-center gap-2">
          <Link href={`/test-faculty/edit-faculty?id=${item.id}`}>
            <Button className="w-12 h-10 flex items-center justify-center rounded-full bg-blue-300 hover:bg-blue-400">
              <Pencil size={28} strokeWidth={3} color="white" />
            </Button>
          </Link>

          <Button
            className="w-12 h-10 flex items-center justify-center rounded-full bg-purple-300 hover:bg-purple-400"
            onClick={() => handleDelete(item)}
          >
            <Trash2 size={28} strokeWidth={3} color="white" />
          </Button>
        </div>
      </td>
    </tr>
  )

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="bg-white shadow-xl p-4 rounded-md flex-1 mt-0 relative">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold text-primary">
          Quản lý chuyên khoa
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div className="flex items-center gap-4 self-end">
          <Link href="/test-faculty/add-faculty">
            <Button className="flex items-center justify-center rounded-full bg-gradient-to-r from-blue-300 to-cyan-300 text-white">
              Thêm Chuyên Khoa
            </Button>
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto p-4">
        <Table columns={columns} data={dataWithIndex} renderRow={renderRow} />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      {showModal && (
        <ModalDelete
          showModal={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={confirmDelete}
          label={`chuyên khoa ${facultyToDelete?.name}`}
        />
      )}
      {!fadeOut && message && (
        <div className="absolute top-4 right-4 p-4 bg-green-100 text-green-800 rounded shadow-md">
          {message}
        </div>
      )}
    </div>
  )
}

export default ListFaculty
