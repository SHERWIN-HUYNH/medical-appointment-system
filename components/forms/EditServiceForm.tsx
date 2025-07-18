'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState, useCallback } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { Form } from '../ui/form'
import CustomFormField, { FormFieldType } from '../CustomFormField'
import { SelectItem } from '../ui/select'
import { useSearchParams, useRouter } from 'next/navigation'
import { ServiceFormValidation } from '@/validation/service'
import { SUCCESS_UPDATE_SERVICE } from '@/validation/messageCode/apiMessageCode/service'

type Faculty = {
  id: string
  name: string
}

const EditServiceForm = () => {
  const [loading, setLoading] = useState(false)
  const [facultyData, setFacultyData] = useState<Faculty[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const form = useForm<z.infer<typeof ServiceFormValidation>>({
    resolver: zodResolver(ServiceFormValidation),
    defaultValues: {
      name: '',
      price: '',
      description: '',
      facultyId: '',
    },
  })

  const fetchFacultyData = async () => {
    const response = await fetch(`/api/faculty`)
    if (response.ok) {
      const data = await response.json()
      setFacultyData(data)
    }
  }

  const fetchServiceData = useCallback(async () => {
    const response = await fetch(`/api/service/${id}`)
    if (response.ok) {
      const service = await response.json()
      form.reset({
        name: service.name,
        price: service.price.toString(),
        description: service.description,
        facultyId: service.facultyId,
      })
    } else {
      const message = await response.json()
      toast.error(message.error)
    }
  }, [id, form])

  useEffect(() => {
    fetchFacultyData()
    if (id) {
      fetchServiceData()
    }
  }, [id, fetchServiceData])

  const onSubmit = async (values: z.infer<typeof ServiceFormValidation>) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/service/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        toast.success(SUCCESS_UPDATE_SERVICE)
        router.push('/admin/service')
      } else {
        const message = await response.json()
        toast.error(message.error)
      }
    } catch {
      toast.error('An error occurred while updating the service')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="p-6.5">
          <div className="flex gap-6">
            <div className="flex-1">
              <div className="mb-4.5">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="name"
                  label="Tên dịch vụ"
                  placeholder=""
                />
              </div>
              <div className="mb-4.5">
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="description"
                  label="Thông tin chi tiết"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="mb-4.5">
                <CustomFormField
                  fieldType={FormFieldType.PRICE}
                  control={form.control}
                  name="price"
                  label="Giá dịch vụ"
                  placeholder=""
                />
              </div>
              <div className="mb-4.5">
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name="facultyId"
                  label="Chọn chuyên khoa"
                  placeholder={
                    facultyData.find((f) => f.id === form.getValues('facultyId'))?.name ||
                    'Select a faculty'
                  }
                >
                  {facultyData.map((faculty) => (
                    <SelectItem key={faculty.id} value={faculty.id}>
                      <div className="flex cursor-pointer items-center gap-2">
                        <p>{faculty.name}</p>
                      </div>
                    </SelectItem>
                  ))}
                </CustomFormField>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              className="w-24 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              {loading ? 'Đang lưu...' : 'Lưu'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default EditServiceForm
