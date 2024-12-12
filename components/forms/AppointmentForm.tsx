'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import React from 'react'
import { getAppointmentSchema } from '@/lib/validation'
import CustomFormField, { FormFieldType } from '../CustomFormField'
import SubmitButton from '../SubmitButton'
import { Form } from '../ui/form'
import { AppointmentSchedule } from '@/types/interface'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { INPUT_REQUIRED } from '@/validation/messageCode/authentication'
import { CANCEL_FAIL, CANCEL_SUCCESS } from '@/validation/messageCode/appointment'

export const AppointmentForm = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  patientId,
  type = 'create',
  appointment,
  stripeCustomerId,
}: {
  userId: string
  patientId: string
  type: 'create' | 'schedule' | 'cancel' | 'Chi tiết' | 'Hủy'
  appointment?: AppointmentSchedule
  stripeCustomerId?: string
  setOpen?: Dispatch<SetStateAction<boolean>>
}) => {
  console.log(appointment)
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const AppointmentFormValidation = getAppointmentSchema(type)
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment?.doctorSchedule.doctor.name : '',
      schedule: appointment
        ? new Date(appointment?.doctorSchedule.schedule.date)
        : new Date(Date.now()),
      reason: appointment ? appointment.profile.symptom : '',
      note: appointment?.profile.pastMedicalHistory || '',
      cancellationReason: appointment?.cancellationReason || '',
    },
  })

  const onSubmit = async () => {
    console.log('TYPE', type)
    console.log(form.getValues('cancellationReason'))
    console.log(isLoading)
    if (form.getValues('cancellationReason')?.length == 0) {
      toast.error(INPUT_REQUIRED)
    } else {
      setIsLoading(true)
      if (type === 'Hủy') {
        const res = await fetch(`/api/appointments/${session?.user.id}`, {
          method: 'PUT',
          body: JSON.stringify({
            paymentIntentId: stripeCustomerId,
            cancellationReason: form.getValues('cancellationReason'),
            appointmentId: appointment?.id,
          }),
        })
        if (res.ok) {
          toast.success(CANCEL_SUCCESS)
        } else {
          toast.error(CANCEL_FAIL)
        }
      }
      setIsLoading(false)
    }
  }

  let buttonLabel
  switch (type) {
    case 'cancel':
      buttonLabel = 'Cancel Appointment'
      break
    case 'schedule':
      buttonLabel = 'Schedule Appointment'
      break
    default:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      buttonLabel = 'Submit Apppointment'
  }
  const title = type == 'Chi tiết' ? 'Đóng' : 'Hủy lịch hẹn'
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        {type === 'create' && (
          <section className="mb-12 space-y-4">
            <h1 className="header">New Appointment</h1>
            <p className="text-dark-700">Request a new appointment in 10 seconds.</p>
          </section>
        )}

        {type !== 'Hủy' && (
          <>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="primaryPhysician"
              label="Bác sĩ"
              placeholder="Select a doctor"
              disabled={true}
            ></CustomFormField>

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="schedule"
              label="Ngày khám"
              showTimeSelect
              dateFormat="MM/dd/yyyy  -  h:mm aa"
              disabled={true}
            />

            <div className={`flex flex-col gap-6  ${type === 'create' && 'xl:flex-row'}`}>
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="reason"
                label="Lí do khám bệnh"
                disabled={true}
              />
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="medicalHistory"
                label="Tiền sử bệnh án"
                placeholder="Không"
                disabled={true}
              />
            </div>
          </>
        )}

        {type === 'Hủy' && (
          <>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="primaryPhysician"
              label="Bác sĩ"
              placeholder="Select a doctor"
              disabled={true}
            ></CustomFormField>

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="schedule"
              label="Ngày khám"
              showTimeSelect
              dateFormat="MM/dd/yyyy  -  h:mm aa"
              disabled={true}
            />
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="cancellationReason"
              label="Lí do hủy hẹn"
              placeholder="Họp đột xuất"
            />
          </>
        )}
        <SubmitButton isLoading={isLoading} className={`shad-danger-btn w-full`}>
          {title}
        </SubmitButton>
      </form>
    </Form>
  )
}
