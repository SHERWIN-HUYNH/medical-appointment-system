'use client'
import ModalDelete from '@/components/ModalDelete'
import { DataTable } from '@/components/Table'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { ColumnDef } from '@tanstack/react-table'
import { formatPrice } from '@/helpers/formatCurrency'
import {
  FAILED_DELETE_SERVICE,
  FAILED_GET_SERVICE,
  SUCCESS_DELETE_SERVICE,
} from '@/validation/messageCode/apiMessageCode/service'

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

const ListService = () => {
  const [facultyData, setFacultyData] = useState<Faculty[]>([])
  const [serviceData, setServiceData] = useState<Service[]>([])
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const serviceResponse = await fetch(`/api/service`)
        if (serviceResponse.ok) {
          const serviceData = await serviceResponse.json()
          setServiceData(serviceData)
        }

        const facultyResponse = await fetch(`/api/faculty`)
        if (facultyResponse.ok) {
          const facultyData = await facultyResponse.json()
          setFacultyData(facultyData)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        toast.error(FAILED_GET_SERVICE)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const getFacultyName = (facultyId: string) => {
    const faculty = facultyData.find((f) => f.id === facultyId)
    return faculty ? faculty.name : 'NULL'
  }

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
        toast.success(SUCCESS_DELETE_SERVICE)
      } else {
        const message = await response.json()
        toast.error(message.error)
      }
    } catch (error) {
      console.error('Error deleting service:', error)
      toast.error(FAILED_DELETE_SERVICE)
    } finally {
      setServiceToDelete(null)
      setShowModal(false)
    }
  }

  const columns: ColumnDef<Service>[] = [
    {
      accessorKey: 'name',
      header: 'Dịch vụ',
      enableSorting: true,
      sortingFn: (rowA, rowB) => {
        const a = rowA.original.name.toLowerCase()
        const b = rowB.original.name.toLowerCase()
        return a < b ? -1 : a > b ? 1 : 0
      },
    },
    {
      accessorKey: 'price',
      header: 'Giá dịch vụ',
      cell: ({ row }) => formatPrice(row.original.price),
      enableSorting: true,
      sortingFn: (rowA, rowB) => rowA.original.price - rowB.original.price,
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
      accessorKey: 'description',
      header: 'Mô tả',
      enableSorting: false,
    },
    {
      id: 'actions',
      header: 'Thao tác',
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/service/edit-service?id=${row.original.id}`}>
            <Button className="w-12 h-10 flex items-center justify-center rounded-full bg-primary">
              <Pencil size={28} strokeWidth={3} color="white" />
            </Button>
          </Link>
          <Button
            className="w-12 h-10 flex items-center justify-center rounded-full bg-red-700"
            onClick={() => {
              setServiceToDelete(row.original)
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
        <h1 className="text-lg font-semibold text-primary">All Service</h1>
        <Link href="/admin/service/add-service">
          <Button className="flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-400 text-white">
            Thêm dịch vụ
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
            data={serviceData}
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
              dataLength: serviceData.length,
              label: 'dịch vụ',
            }}
          />
        )}
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
