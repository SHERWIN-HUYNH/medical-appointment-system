'use client'
import React from 'react'
import { DataTable } from '@/components/Table'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { ColumnDef } from '@tanstack/react-table'
import ModalDelete from '@/components/ModalDelete'
import {
  FAILED_DELETE_FACULTY,
  SUCCESS_DELETE_FACULTY,
} from '@/validation/messageCode/apiMessageCode/faculty'

type Faculty = {
  id: string
  name: string
  description: string
}

const ListFaculty = () => {
  const [facultyData, setFacultyData] = useState<Faculty[]>([])
  const [facultyToDelete, setFacultyToDelete] = useState<Faculty | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchFaculties = async () => {
      const response = await fetch(`/api/faculty`)
      if (response.ok) {
        const data = await response.json()
        setFacultyData(data)
      }
    }

    fetchFaculties()
  }, [])

  const confirmDelete = async () => {
    if (!facultyToDelete) return

    try {
      const response = await fetch(`/api/faculty`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: facultyToDelete.id }),
      })
      if (response.ok) {
        setFacultyData((prevData) =>
          prevData.filter((faculty) => faculty.id !== facultyToDelete.id),
        )
        toast.success(SUCCESS_DELETE_FACULTY)
      } else {
        const message = await response.json()
        toast.error(message.error)
      }
    } catch (error) {
      console.error('Error deleting faculty:', error)
      toast.error(FAILED_DELETE_FACULTY)
    } finally {
      setFacultyToDelete(null)
      setShowModal(false)
    }
  }

  const columns: ColumnDef<Faculty>[] = [
    {
      accessorKey: 'name',
      header: 'Chuyên khoa',
      cell: ({ row }) => row.original.name,
      enableSorting: true,
    },
    {
      accessorKey: 'description',
      header: 'Mô tả',
      cell: ({ row }) => row.original.description,
      enableSorting: false,
    },
    {
      id: 'actions',
      header: 'Thao tác',
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/faculty/edit-faculty?id=${row.original.id}`}>
            <Button className="w-12 h-10 flex items-center justify-center rounded-full bg-primary">
              <Pencil size={28} strokeWidth={3} color="white" />
            </Button>
          </Link>
          <Button
            className="w-12 h-10 flex items-center justify-center rounded-full bg-red-700"
            onClick={() => {
              setFacultyToDelete(row.original)
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
    <div className="bg-white shadow-xl p-4 rounded-md flex-1 mt-0">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold text-primary">Quản lý chuyên khoa</h1>
        <Link href="/admin/faculty/add-faculty">
          <Button className="flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-400 text-white">
            Thêm chuyên khoa
          </Button>
        </Link>
      </div>

      <div className="flex-1">
        <DataTable
          columns={columns}
          data={facultyData}
          searchKey="name"
          paginationProps={{
            dataLength: facultyData.length,
            label: 'chuyên khoa',
          }}
        />
      </div>

      {showModal && (
        <ModalDelete
          showModal={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={confirmDelete}
          label={`chuyên khoa ${facultyToDelete?.name}`}
        />
      )}
    </div>
  )
}

export default ListFaculty
