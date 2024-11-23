'use client'
import { Button } from '@/components/ui/button'
import { BriefcaseMedical, CalendarDays, CircleUser, ClipboardPlus, Clock10, FilePen, InfoIcon, Stethoscope, TrashIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import ReviewModal from './ReviewModal'
import { BillInfor } from '@/types/interface'
import { AppointmentStatus } from '@prisma/client'

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
  const [selectedAppointment, setSelectedAppointment] = useState<BillInfor[]>(appointments.filter((bill) => bill.appointment.status === AppointmentStatus.PENDING))
  const handleReviewClick = (bill: BillInfor) => {
    // setSelectedAppointment(bill)
    setShowReviewModal(true)
  }

  const handleSubmitReview = async () => {
    if (rating === 0) {
      alert('Vui lòng chọn số sao đánh giá')
      return
    }

    if (!selectedAppointment) return

    try {
      const response = await fetch('/api/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          rating: rating,
          doctorId: selectedAppointment.appointment.doctorSchedule.doctor.id,
          userId: params.userId,
        }),
      })

      if (response.ok) {
        alert('Đánh giá thành công!')
        setShowReviewModal(false)
        setSelectedAppointment(null)
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
  
    const handleClick = (value: AppointmentStatus) => {
      console.log('Clicked status:', value);
      setSelectedStatus(value);
      const filteredAppointments = appointments.filter(
        (bill) => bill.appointment.status === value
      );
      setSelectedAppointment(filteredAppointments);
    };
    
    useEffect(() => {
      console.log('Selected appointments:', selectedAppointment);
    }, [selectedAppointment]);
  return (
    <div>
      <div className="flex gap-3">
        {statuses.map((status) => (
          <Button
            key={status.value}
            className={`text-sm px-4 py-1.5 rounded-full ${
              selectedStatus === status.value
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={()=> handleClick(status.value)}
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
              className="shadow-[4px_8px_30px_0_rgba(177,196,218,0.35)] border overflow-hidden mt-5 rounded-2xl border-solid border-[#eaeaea]"
            >
              <ul className=" p-5">
                <li className="text-sm font-semibold">
                  <p className='text-primary text-base font-medium flex gap-x-1'><CircleUser className="w-5 h-5 text-highlight" /><span className='text-highlight font-normal mr-2'>Họ và tên: </span>{bill.appointment.profile.name}</p>
                </li>
                <li className="text-sm font-semibold">
                <p className='text-highlight text-base font-medium flex gap-x-1'> <ClipboardPlus className="w-5 h-5 text-highlight"/><span className=' font-normal mr-2'>Khoa: </span>{bill.appointment.doctorSchedule.doctor.faculty.name}</p>

                </li>
                <li className="text-sm font-semibold">
                <p className='text-highlight text-base font-medium flex gap-x-1'> <Stethoscope className="w-5 h-5 text-highlight"/><span className=' font-normal mr-2'>Dịch vụ: </span>{bill.appointment.Service.name}</p>

                </li>
                <li className="text-sm font-semibold">
                <p className='text-highlight text-base font-medium flex gap-x-1'> <BriefcaseMedical className="w-5 h-5 text-highlight"/><span className=' font-normal mr-2'>Bác sĩ: </span>{bill.appointment.doctorSchedule.doctor.name}</p>

                </li>
                <li className="text-sm font-semibold">
                <p className='text-highlight text-base font-medium flex gap-x-1'><CalendarDays className="w-5 h-5 text-highlight"/><span className=' font-normal mr-2'>Thời gian: </span>{bill.appointment.doctorSchedule.schedule.date}</p>
                </li>
                <li className="text-sm font-semibold">
                <p className='text-highlight text-base font-medium flex gap-x-1'> <Clock10 className="w-5 h-5 text-highlight"/><span className=' font-normal mr-2'>Giờ khám: </span>{bill.appointment.doctorSchedule.schedule.timeSlot}</p>
                </li>
              </ul>
              <div className="flex justify-end gap-2 bg-[#f5f5f5] px-5 py-3">
                {bill.status === 'PENDING' && (
                  <Button
                    size="sm"
                    className="text-red-500 text-xs flex items-center bg-transparent"
                  >
                    <TrashIcon className="w-3 h-3 mr-1" /> Hủy lịch hẹn
                  </Button>
                )}
                {bill.status === 'SCHEDULED' && (
                  <Button
                    size="sm"
                    className="text-yellow-500 text-xs flex items-center bg-transparent"
                    onClick={() => handleReviewClick(bill)}
                  >
                    <FilePen className="w-3 h-3 mr-1" /> Đánh giá
                  </Button>
                )}
                <Button
                  size="sm"
                  className="text-gray-600 text-xs flex items-center bg-transparent"
                >
                  <InfoIcon className="w-3 h-3 mr-1" /> Chi tiết
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
    </div>
  )
}

export default Medicalbill
