'use client'
import ModalDelete from '@/components/ModalDelete'
import Pagination from '@/components/Pagination'
import TableSearch from '@/components/table/TableSearch'
import { Button } from '@/components/ui/button'
import { Trash2, Star as StarSolid } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Comment = {
  id: number
  createdAt: string
  userName: string
  doctorName: string
  content: string
  rating: number
}
interface TableProps<T> {
  columns: { header: string; accessor: string; className?: string }[]
  data: T[]
  renderRow: (row: T) => React.ReactNode
}

function Table<T>({ columns, data, renderRow }: TableProps<T>) {
  return (
    <table className="w-full border-collapse border border-slate-200">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.accessor} className={col.className}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map(renderRow)}</tbody>
    </table>
  )
}

const columns = [
  { header: 'STT', accessor: 'index', className: 'w-[5%]' },
  { header: 'Ngày đăng', accessor: 'createdAt', className: 'text-left w-[10%]' },
  { header: 'Bác sĩ', accessor: 'doctorName', className: 'text-left w-[16%]' },
  { header: 'Tên người dùng', accessor: 'userName', className: 'text-left w-[16%]' },
  {
    header: 'Nội dung',
    accessor: 'content',
    className: 'hidden md:table-cell text-left w-[35%]',
  },
  { header: 'Số sao đánh giá', accessor: 'rating', className: 'text-left w-[12%]' },
]

const ListComment = () => {
  const [comments, setCommentData] = useState<Comment[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const itemsPerPage = 7
  const [showModal, setShowModal] = useState(false)
  const [commentToDelete, setCommentToDelete] = useState<Comment | null>(null)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comment`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
          throw new Error('Lỗi khi lấy danh sách đánh giá')
        }
        const comments = await response.json()
        console.log(comments)
        setCommentData(comments)
      } catch (error) {
        console.error('Error fetching comments:', error)
        toast.error('Lỗi khi tải đánh giá! Vui lòng thử lại.')
      }
    }

    fetchComments()
  }, [])

  const confirmDelete = async () => {
    if (commentToDelete) {
      try {
        const response = await fetch(`/api/comment`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ commentValues: commentToDelete }),
        })
        if (!response.ok) {
          throw new Error('Không thể xóa đánh giá.')
        }

        const updatedCommentData = comments.filter(
          (comment) => comment.id !== commentToDelete.id,
        )
        setCommentData(updatedCommentData)

        setCommentToDelete(null)
        setShowModal(false)
        toast.success('Xóa đánh giá thành công')
      } catch (error) {
        console.error('Lỗi khi xóa đánh giá:', error)
        toast.error('Lỗi khi xóa đánh giá!')
      }
    }
  }

  const totalPages = Math.ceil(comments.length / itemsPerPage)

  const filteredData = comments.filter(
    (item) => !selectedRating || item.rating === selectedRating,
  )

  const displayedData = filteredData
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    .map((item, index) => ({
      ...item,
      index: (currentPage - 1) * itemsPerPage + index + 1,
    }))

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm) {
    } else {
      const results = comments.filter((item) =>
        item.doctorName.toLowerCase().includes(searchTerm.toLowerCase()),
      )

      if (results.length === 0) {
        toast.error('Không tìm thấy đánh giá nào phù hợp.')
      }

      setCommentData(results)
      setCurrentPage(1)
    }
  }

  const renderStars = (rating: number) => (
    <div className="flex justify-center">
      {[...Array(5)].map((_, index) => (
        <StarSolid
          key={index}
          size={20}
          fill={index < rating ? 'gold' : 'gray'}
          stroke="none"
        />
      ))}
    </div>
  )

  const renderRow = (item: Comment & { index: number }) => {
    const date = new Date(item.createdAt)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    const formattedDate = `${day}/${month}/${year}`

    return (
      <tr
        key={item.id}
        className="h-15 border-b text-left border-slate-200 even:bg-slate-50 text-sm hover:bg-blue-50"
      >
        <td className="text-center">{item.index}</td>
        <td className="text-left">{formattedDate}</td>
        <td className="text-left">{item.doctorName}</td>
        <td className="text-left">{item.userName}</td>
        <td className="hidden md:table-cell text-left">{item.content}</td>
        <td className="text-left">{renderStars(item.rating)}</td>
        <td className="w-[5%]">
          <div className="flex items-center gap-2">
            <Button
              className="w-12 h-10 flex items-center justify-center rounded-full bg-red-400"
              onClick={() => {
                setCommentToDelete(item)
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
    <div className="bg-white shadow-xl p-4 rounded-md flex-1 mt-0 relative h-screen">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold text-primary">
          Quản lý đánh giá
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch onSearch={handleSearch} />

          <select
            className="p-2 border rounded-xl border-primary"
            value={selectedRating || ''}
            onChange={(e) => setSelectedRating(Number(e.target.value) || null)}
          >
            <option value="">Số sao</option>
            {[5, 4, 3, 2, 1].map((rating) => (
              <option key={rating} value={rating}>
                {rating} sao
              </option>
            ))}
          </select>
        </div>
      </div>
      {filteredData.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <Table columns={columns} data={displayedData} renderRow={renderRow} />
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <div className="mt-4 text-center text-slate-500">
          Không tìm thấy đánh giá nào phù hợp.
        </div>
      )}

      {showModal && (
        <ModalDelete
          showModal={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={confirmDelete}
          label={`đánh giá này`}
        />
      )}
    </div>
  )
}

export default ListComment
