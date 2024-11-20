'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import React from 'react'
import { getAppointmentSchema } from '@/lib/validation'
import CustomFormField, { FormFieldType } from '../CustomFormField'
import SubmitButton from '../SubmitButton'
import { Form } from '../ui/form'
import { createAppointment } from '@/lib/action/appointment.actions'
import { AppointmentSchedule } from '@/types/interface'

export const AppointmentForm = ({
  userId,
  patientId,
  type = 'create',
  appointment,
  setOpen,
}: {
  userId: string
  patientId: string
  type: 'create' | 'schedule' | 'cancel' | 'Chi tiết' | 'Hủy'
  appointment?: AppointmentSchedule
  setOpen?: Dispatch<SetStateAction<boolean>>
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  console.log('appointment type', type)
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

  const onSubmit = async (values: z.infer<typeof AppointmentFormValidation>) => {
    setIsLoading(true)

    let status
    switch (type) {
      case 'schedule':
        status = 'scheduled'
        break
      case 'cancel':
        status = 'cancelled'
        break
      default:
        status = 'pending'
    }
    console.log('SHOW PATIENTID', patientId)
    try {
      if (type === 'create' && patientId) {
        const appointment = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          status: status as Status,
          note: values.note,
        }
        console.log('NEW APPOINTMENT', appointment)
        const newAppointment = await createAppointment(appointment)

        if (newAppointment) {
          console.log('NEW APPOINTMENT', newAppointment)
          form.reset()
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`,
          )
        }
      } else {
        console.log('UPDATE WORKING')
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment?.id,
          appointment: {
            primaryPhysician: values.primaryPhysician,
            schedule: new Date(values.schedule),
            status: status as Status,
            cancellationReason: values.cancellationReason,
          },
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          type,
        }
        // Code to cancell an appointment
        // const updatedAppointment = await updateAppointment(appointmentToUpdate);

        // if (updatedAppointment) {
        //   // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        //   setOpen && setOpen(false);
        //   form.reset();
        // }
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        {type === 'create' && (
          <section className="mb-12 space-y-4">
            <h1 className="header">New Appointment</h1>
            <p className="text-dark-700">Request a new appointment in 10 seconds.</p>
          </section>
        )}

        {type !== 'cancel' && (
          <>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="primaryPhysician"
              label="Bác sĩ"
              placeholder="Select a doctor"
            ></CustomFormField>

            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Ngày khám"
              showTimeSelect
              dateFormat="MM/dd/yyyy  -  h:mm aa"
            />

            <div className={`flex flex-col gap-6  ${type === 'create' && 'xl:flex-row'}`}>
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="reason"
                label="Lí do khám bệnh"
                placeholder="Annual montly check-up"
                disabled={type === 'schedule'}
              />
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="medicalHistory"
                label="Tiền sử bệnh án"
                placeholder="Prefer afternoon appointments, if possible"
                disabled={type === 'schedule'}
              />
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Ghi chú"
                placeholder="Prefer afternoon appointments, if possible"
                disabled={type === 'schedule'}
              />
            </div>
          </>
        )}

        {type === 'cancel' && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Lí do hủy hẹn"
            placeholder="Họp đột xuất"
          />
        )}
        <SubmitButton
          isLoading={isLoading}
          className={`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}
        >
          Đóng
        </SubmitButton>
      </form>
    </Form>
  )
}
