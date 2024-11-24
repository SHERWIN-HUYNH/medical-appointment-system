'use client'
import { Button } from '@/components/ui/button'
import { BriefcaseMedical, CalendarDays, CircleUser, ClipboardPlus, Clock10, FilePen, InfoIcon, Stethoscope, TrashIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import ReviewModal from './ReviewModal'
import { BillInfor } from '@/types/interface'
import { AppointmentStatus } from '@prisma/client'
import { toast } from 'sonner'
import ModalMedicalBillDetail from './ModalMedicalBillDetail'
import { shortenTitle } from '@/lib/utils'
import clsx from 'clsx'

type Medicalbill = {
  id: string
  patientName: string
  faculty: string
  doctorName: string
  serviceName: string
  price: number
  time: string
  hour: string
  status: 'SCHEDULED' | 'PENDING' | 'CANCELLED'
  doctorId: string
  cancellationReason: string | null
}

const statuses = [
  { value: AppointmentStatus.PENDING, label: 'Đang chờ khám' },
  { value: AppointmentStatus.SCHEDULED, label: 'Đã khám' },
  { value: AppointmentStatus.CANCELLED, label: 'Đã hủy' },
]
interface Props {
  appointments: BillInfor[] | undefined;
}
const Medicalbill: React.FC<Props> = ({appointments}) => {
  if(!appointments) return (<p>Bạn không có phiếu khám nào trong trạng thái này.</p>)
  const params = useParams()
  const [selectedStatus, setSelectedStatus] = useState<AppointmentStatus>(AppointmentStatus.PENDING)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [selectedAppointment, setSelectedAppointment] = useState<BillInfor[]>([])
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedBillDetail, setSelectedBillDetail] = useState<BillInfor | null>(null)

  useEffect(() => {
    if (appointments) {
      const filteredAppointments = appointments.filter(
        (bill) => bill.appointment.status === selectedStatus
      )
      setSelectedAppointment(filteredAppointments)
    }
  }, [selectedStatus, appointments])

  const handleClick = (value: AppointmentStatus) => {
    setSelectedStatus(value)
  }

  const handleReviewClick = (bill: BillInfor) => {
    setSelectedAppointment([bill])
    setShowReviewModal(true)
  }

  const handleSubmitReview = async () => {
    if (rating === 0) {
      toast.error('Vui lòng chọn số sao đánh giá')
      return
    }

    if (!selectedAppointment.length) return

    try {
      const response = await fetch('/api/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          rating: rating,
          doctorId: selectedAppointment[0].appointment.doctorSchedule.doctor.id,
          userId: params.userId,
        }),
      })

      if (response.ok) {
        toast.success('Đánh giá thành công!')
        setShowReviewModal(false)
        setSelectedAppointment([])
        setRating(0)
        setComment('')
      } else {
        throw new Error('Failed to submit review')
      }
    } catch (error) {
      console.error('Error submitting review:', error)
      alert('Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại sau.')
    }
  }

  const handleDetailClick = (bill: BillInfor) => {
    setSelectedBillDetail(bill)
    setShowDetailModal(true)
  }

  return (
    <div>
      <div className="flex gap-3">
        {statuses.map((status) => (
          <Button
            key={status.value}
            className={clsx(
              "text-sm px-6 py-2 rounded-full font-medium shadow-md transition-all duration-200",
              selectedStatus === status.value
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-blue-200 scale-105"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-slate-200 hover:shadow-md"
            )}
            onClick={() => handleClick(status.value)}
          >
            {status.label}
          </Button>
        ))}
      </div>
      <div className="mt-5">
        {selectedAppointment.length > 0 ? (
          selectedAppointment.map((bill) => (
            <div
              key={bill.id}
              className="shadow-[4px_8px_30px_0_rgba(177,196,218,0.35)] border overflow-hidden mt-5 rounded-2xl border-solid border-[#eaeaea] max-w-3xl mx-auto"
            >
              <ul className="p-2 space-y-2">
                <li className="text-sm">
                  <div className="p-2">
                    <div className="space-y-1">
                      <div className='flex items-center gap-x-2'>
                        <CircleUser className="w-5 h-5 text-primary" />
                        <span className='text-primary uppercase font-medium'>{bill.appointment.profile.name}</span>
                      </div>
                      <div className='flex items-center gap-x-2'>
                        <ClipboardPlus className="w-4 h-4 text-slate-400"/>
                        <span className='text-slate-400'>Chuyên khoa:</span>
                        <span >{bill.appointment.doctorSchedule.doctor.faculty.name}</span>
                      </div>
                      <div className='flex items-center gap-x-2'>
                        <Stethoscope className="w-4 h-4 text-slate-400"/>
                        <span className='text-slate-400'>Dịch vụ:</span>
                        <span >{bill.appointment.Service.name}</span>
                      </div>
                      <div className='flex items-center gap-x-2'>
                        <BriefcaseMedical className="w-4 h-4 text-slate-400"/>
                        <span className='text-slate-400'>Bác sĩ:</span>
                        <span>{shortenTitle(bill.appointment.doctorSchedule.doctor.academicTitle)}.{bill.appointment.doctorSchedule.doctor.name}</span>
                      </div>
                      <div className='flex items-center gap-x-2'>
                        <CalendarDays className="w-4 h-4 text-slate-400"/>
                        <span className='text-slate-400'>Thời gian:</span>
                        <span >{bill.appointment.doctorSchedule.schedule.date}</span>
                      </div>
                      <div className='flex items-center gap-x-2'>
                        <Clock10 className="w-4 h-4 text-slate-400"/>
                        <span className='text-slate-400'>Giờ khám:</span>
                        <span >{bill.appointment.doctorSchedule.schedule.timeSlot}</span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="flex justify-end gap-2 bg-[#f5f5f5] px-4 py-2">
                {bill.appointment.status === AppointmentStatus.PENDING && (
                  <Button
                    size="sm"
                    className="text-red-500 text-sm flex items-center bg-transparent hover:bg-transparent"
                  >
                    <TrashIcon className="w-4 h-4 mr-1" /> Hủy lịch hẹn
                  </Button>
                )}
                {bill.appointment.status === AppointmentStatus.SCHEDULED && (
                  <Button
                    size="sm"
                    className="text-yellow-500 text-sm flex items-center bg-transparent hover:bg-transparent"
                    onClick={() => handleReviewClick(bill)}
                  >
                    <FilePen className="w-4 h-4 mr-1" /> Đánh giá
                  </Button>
                )}
                <Button
                  size="sm"
                  className="text-gray-600 text-sm flex items-center bg-transparent hover:bg-transparent"
                  onClick={() => handleDetailClick(bill)}
                >
                  <InfoIcon className="w-4 h-4 mr-1" /> Chi tiết
                </Button>
              </div>
            </div>
          ))
        ):<p>Bạn không có phiếu khám nào trong trạng thái này.</p>}
      </div>

      {showReviewModal && (
        <ReviewModal
          rating={rating}
          setRating={setRating}
          comment={comment}
          setComment={setComment}
          onSubmit={handleSubmitReview}
          onClose={() => {
            setShowReviewModal(false)
            setSelectedAppointment([])
            setRating(0)
            setComment('')
          }}
        />
      )}

      {showDetailModal && selectedBillDetail && (
        <ModalMedicalBillDetail
          bill={selectedBillDetail}
          onClose={() => {
            setShowDetailModal(false)
            setSelectedBillDetail(null)
          }}
        />
      )}
    </div>
  )
}

export default Medicalbill
