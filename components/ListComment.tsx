'use client'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { DataTable } from '@/components/Table'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Star, Trash2 } from 'lucide-react'
import ModalDelete from '@/components/ModalDelete'

type Comment = {
  id: number
  createdAt: string
  userName: string
  doctorName: string
  content: string
  rating: number
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

const ListComment = () => {
  const [comments, setCommentData] = useState<Comment[]>([])
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
        setCommentData(comments)
      } catch (error) {
        console.error('Error fetching comments:', error)
      }
    }

    fetchComments()
  }, [])

  const renderStars = (rating: number) => (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={20}
          fill={index < rating ? 'gold' : 'gray'}
          stroke="none"
        />
      ))}
    </div>
  )

  const confirmDelete = async () => {
    if (!commentToDelete) return

    try {
      const response = await fetch(`/api/comment`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: commentToDelete.id }),
      })

      if (response.ok) {
        setCommentData((prevData) =>
          prevData.filter((comment) => comment.id !== commentToDelete.id),
        )
        toast.success('Xóa đánh giá thành công!')
      } else {
        const message = await response.json()
        toast.error(message.error)
      }
    } catch (error) {
      console.error('Error deleting comment:', error)
      toast.error('Đã xảy ra lỗi khi xóa đánh giá!')
    } finally {
      setCommentToDelete(null)
      setShowModal(false)
    }
  }

  const ratingFilterOptions = {
    key: 'rating',
    placeholder: 'Số sao',
    options: [
      { label: '1 sao', value: '1' },
      { label: '2 sao', value: '2' },
      { label: '3 sao', value: '3' },
      { label: '4 sao', value: '4' },
      { label: '5 sao', value: '5' },
    ],
  }

  const columns: ColumnDef<Comment>[] = [
    {
      accessorKey: 'createdAt',
      header: 'Ngày đăng',
      enableSorting: true,
      cell: ({ row }) => formatDate(row.original.createdAt),
      sortingFn: (rowA, rowB) => {
        const dateA = new Date(rowA.original.createdAt)
        const dateB = new Date(rowB.original.createdAt)
        return dateA.getTime() - dateB.getTime()
      },
    },
    {
      accessorKey: 'doctorName',
      header: 'Bác sĩ',
      enableSorting: true,
    },
    {
      accessorKey: 'userName',
      header: 'Người dùng',
      enableSorting: true,
    },
    {
      accessorKey: 'content',
      header: 'Nội dung',
      enableSorting: false,
    },
    {
      accessorKey: 'rating',
      header: 'Đánh giá',
      enableSorting: true,
      cell: ({ row }) => renderStars(row.original.rating),
      sortingFn: (rowA, rowB) => rowA.original.rating - rowB.original.rating,
      filterFn: (row, id, filterValue) => {
        if (!filterValue || filterValue.length === 0) return true
        const filterValues = filterValue.map(Number)
        return filterValues.includes(row.getValue('rating'))
      },
    },
    {
      id: 'actions',
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            className="w-12 h-10 flex items-center justify-center rounded-full bg-red-700"
            onClick={() => {
              setCommentToDelete(row.original)
              setShowModal(true)
            }}
          >
            <Trash2 size={28} strokeWidth={3} color="white" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="bg-white shadow-xl p-4 rounded-md flex-1 mt-0 min-h-screen">
      <div className="mb-4">
        <h1 className="text-lg font-semibold text-primary">Danh sách đánh giá</h1>
      </div>

      <div className="flex-1 overflow-x-auto w-full">
        <DataTable
          columns={columns}
          data={comments}
          searchKey="doctorName"
          showSTT={true}
          filterOptions={ratingFilterOptions}
          initialState={{
            pagination: {
              pageSize: 7,
            },
          }}
        />
      </div>

      {showModal && (
        <ModalDelete
          showModal={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={confirmDelete}
          label={`đánh giá của ${commentToDelete?.userName}`}
        />
      )}
    </div>
  )
}

export default ListComment
