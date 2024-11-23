'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import React from 'react'

import { AppointmentForm } from './forms/AppointmentForm'

import 'react-datepicker/dist/react-datepicker.css'
import { AppointmentSchedule } from '@/types/interface'

export const AppointmentModal = ({
  patientId,
  userId,
  appointment,
  type,
}: {
  patientId: string
  userId: string
  appointment?: AppointmentSchedule
  type: 'schedule' | 'cancel' | 'Chi tiết' | 'Hủy'
  title: string
  description: string
}) => {
  const [open, setOpen] = useState(false)
  const title = type == 'Chi tiết' ? 'Chi tiết cuộc hẹn' : 'Hủy lịch hẹn'
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`capitalize ${type === 'Chi tiết' && 'text-green-500'}`}
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">{title}</DialogTitle>
        </DialogHeader>

        <AppointmentForm
          userId={userId}
          patientId={patientId}
          type={type}
          appointment={appointment}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  )
}
