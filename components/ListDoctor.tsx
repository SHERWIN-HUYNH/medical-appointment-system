'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import ModalDelete from '@/components/ModalDelete'
import { DataTable } from '@/components/Table'
import { CalendarRange, Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { academicTitles } from '@/lib/data'
import { toast } from 'sonner'
import { ColumnDef } from '@tanstack/react-table'
import { CldImage } from 'next-cloudinary'
import {
  FAILED_DELETE_DOCTOR,
  SUCCESS_DELETE_DOCTOR,
} from '@/validation/messageCode/apiMessageCode/doctor'

type Doctor = {
  id: string
  name: string
  academicTitle: string
  image: string
  description: string
  facultyId: string
}

type Faculty = {
  id: string
  name: string
}

const ListDoctor = () => {
  const [doctorData, setDoctorData] = useState<Doctor[]>([])
  const [facultyData, setFacultyData] = useState<Faculty[]>([])
  const [showModal, setShowModal] = useState(false)
  const [doctorToDelete, setDoctorToDelete] = useState<Doctor | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Fetch doctor data
        const doctorResponse = await fetch(`/api/doctor`)
        if (doctorResponse.ok) {
          const doctorData = await doctorResponse.json()
          setDoctorData(doctorData)
        }

        // Fetch faculty data
        const facultyResponse = await fetch(`/api/faculty`)
        if (facultyResponse.ok) {
          const facultyData = await facultyResponse.json()
          setFacultyData(facultyData)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        toast.error('Đã xảy ra lỗi khi tải dữ liệu!')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const getFacultyName = (facultyId: string) => {
    const faculty = facultyData.find((fac) => fac.id === facultyId)
    return faculty ? faculty.name : 'Unknown Faculty'
  }

  const getAcademicTitleName = (titleId: string) => {
    const title = academicTitles.find((title) => title.id === titleId)
    return title ? title.name : titleId
  }

  const confirmDelete = async () => {
    if (!doctorToDelete) return

    try {
      const response = await fetch(`/api/doctor`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: doctorToDelete.id }),
      })

      if (response.ok) {
        setDoctorData((prevData) =>
          prevData.filter((doctor) => doctor.id !== doctorToDelete.id),
        )
        toast.success(SUCCESS_DELETE_DOCTOR)
      } else {
        const message = await response.json()
        toast.error(message.error)
      }
    } catch (error) {
      console.error('Error deleting doctor:', error)
      toast.error(FAILED_DELETE_DOCTOR)
    } finally {
      setDoctorToDelete(null)
      setShowModal(false)
    }
  }

  const columns: ColumnDef<Doctor>[] = [
    {
      accessorKey: 'name',
      header: 'Bác sĩ',
      enableSorting: true,
      sortingFn: (rowA, rowB) => {
        const a = rowA.original.name.toLowerCase()
        const b = rowB.original.name.toLowerCase()
        return a < b ? -1 : a > b ? 1 : 0
      },
    },
    {
      accessorKey: 'academicTitle',
      header: 'Học hàm/học vị',
      cell: ({ row }) => (
        <div className="min-w-[150px]">
          {getAcademicTitleName(row.original.academicTitle)}
        </div>
      ),
      enableSorting: true,
      sortingFn: (rowA, rowB) => {
        const a = getAcademicTitleName(rowA.original.academicTitle).toLowerCase()
        const b = getAcademicTitleName(rowB.original.academicTitle).toLowerCase()
        return a < b ? -1 : a > b ? 1 : 0
      },
    },
    {
      accessorKey: 'facultyId',
      header: 'Chuyên khoa',
      cell: ({ row }) => getFacultyName(row.original.facultyId),
      enableSorting: true,
      sortingFn: (rowA, rowB) => {
        const a = getFacultyName(rowA.original.facultyId).toLowerCase()
        const b = getFacultyName(rowB.original.facultyId).toLowerCase()
        return a < b ? -1 : a > b ? 1 : 0
      },
    },
    {
      accessorKey: 'image',
      header: 'Hình ảnh',
      enableSorting: false,
      cell: ({ row }) => (
        <div className="relative w-[80px] h-[80px]">
          <CldImage
            src={row.original.image}
            alt={row.original.name}
            fill
            className="object-cover rounded"
          />
        </div>
      ),
    },
    {
      accessorKey: 'description',
      header: 'Mô tả',
      enableSorting: false,
      cell: ({ row }) => (
        <div className="max-w-[300px] truncate" title={row.original.description}>
          {row.original.description}
        </div>
      ),
    },
    {
      header: 'Thao tác',
      id: 'actions',
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/doctor/${row.original.id}/schedule`}>
            <Button className="w-auto h-10 flex items-center justify-center rounded-full bg-green-300">
              <CalendarRange size={20} strokeWidth={1.75} color="white" />
            </Button>
          </Link>
          <Link href={`/admin/doctor/edit-doctor?id=${row.original.id}`}>
            <Button className="w-12 h-10 flex items-center justify-center rounded-full bg-primary">
              <Pencil size={28} strokeWidth={3} color="white" />
            </Button>
          </Link>
          <Button
            className="w-12 h-10 flex items-center justify-center rounded-full bg-red-700"
            onClick={() => {
              setDoctorToDelete(row.original)
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
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold text-primary">Quản lý bác sĩ</h1>
        <Link href="/admin/doctor/add-doctor">
          <Button className="flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-400 text-white">
            Thêm Bác Sĩ
          </Button>
        </Link>
      </div>
      <div className="flex-1 overflow-x-auto w-full">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={doctorData}
            searchKey="name"
            filterOptions={{
              key: 'facultyId',
              placeholder: 'Chuyên khoa',
              options: facultyData.map((faculty) => ({
                label: faculty.name,
                value: faculty.id,
              })),
            }}
            paginationProps={{
              dataLength: doctorData.length,
              label: 'bác sĩ',
            }}
          />
        )}
      </div>

      {showModal && (
        <ModalDelete
          showModal={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={confirmDelete}
          label={`bác sĩ ${doctorToDelete?.name}`}
        />
      )}
    </div>
  )
}

export default ListDoctor
