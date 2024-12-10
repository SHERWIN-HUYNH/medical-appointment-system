import React, { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '../ui/form'
import CustomFormField, { FormFieldType } from '../CustomFormField'
import { SelectItem } from '../ui/select'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import { ServiceFormValidation } from '@/validation/service'
import { SUCCESS_ADD_SERVICE } from '@/validation/messageCode'

type Faculty = {
  id: string
  name: string
}
const CreateServiceForm = () => {
  const [facultyData, setFacultyData] = useState<Faculty[]>([])

  useEffect(() => {
    const fetchFacultyData = async () => {
      const response = await fetch(`/api/faculty`)
      if (response.ok) {
        const data = await response.json()
        setFacultyData(data)
      }
    }

    fetchFacultyData()
  })
  const form = useForm<z.infer<typeof ServiceFormValidation>>({
    resolver: zodResolver(ServiceFormValidation),
    defaultValues: {
      name: '',
      price: '',
      description: '',
      facultyId: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof ServiceFormValidation>) => {
    const serviceData = {
      ...values,
      price: Number(values.price.replace(/\D/g, '')),
    }

    const response = await fetch(`/api/service`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(serviceData),
    })

    if (response.ok) {
      toast.success(SUCCESS_ADD_SERVICE)
      form.reset({
        name: '',
        price: '',
        description: '',
        facultyId: '',
      })
    } else {
      const message = await response.json()
      toast.error(message.error)
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
                  placeholder="Select a faculty"
                  key={form.getValues('facultyId')}
                >
                  {facultyData.map((faculty) => (
                    <SelectItem key={faculty.id} value={faculty.id}>
                      <span className="flex cursor-pointer items-center gap-2">
                        <p>{faculty.name}</p>
                      </span>
                    </SelectItem>
                  ))}
                </CustomFormField>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="w-24 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Lưu
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default CreateServiceForm
