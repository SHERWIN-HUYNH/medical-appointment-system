import React from 'react'
import { BillInfor } from '@/types/interface'
import { Button } from '../ui/button'
import {
  BellElectric,
  BriefcaseMedical,
  CalendarDays,
  CircleDollarSign,
  CircleUser,
  ClipboardPlus,
  Clock10,
  Stethoscope,
} from 'lucide-react'

interface ModalMedicalBillDetailProps {
  bill: BillInfor
  onClose: () => void
}

const ModalMedicalBillDetail = ({ bill, onClose }: ModalMedicalBillDetailProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <h2 className="text-xl text-primary font-bold mb-4">Chi tiết phiếu khám</h2>

        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CircleUser className="w-5 h-5 text-highlight" />
              <span className="font-medium">Họ và tên:</span>
              <span>{bill.appointment.profile.name}</span>
            </div>

            <div className="flex items-center gap-2">
              <ClipboardPlus className="w-5 h-5 text-highlight" />
              <span className="font-medium">Khoa:</span>
              <span>{bill.appointment.doctorSchedule.doctor.faculty.name}</span>
            </div>

            <div className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-highlight" />
              <span className="font-medium">Dịch vụ:</span>
              <span>{bill.appointment.Service.name}</span>
            </div>

            <div className="flex items-center gap-2">
              <BriefcaseMedical className="w-5 h-5 text-highlight" />
              <span className="font-medium">Bác sĩ:</span>
              <span>{bill.appointment.doctorSchedule.doctor.name}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-highlight" />
              <span className="font-medium">Thời gian:</span>
              <span>{bill.appointment.doctorSchedule.schedule.date}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock10 className="w-5 h-5 text-highlight" />
              <span className="font-medium">Giờ khám:</span>
              <span>{bill.appointment.doctorSchedule.schedule.timeSlot}</span>
            </div>

            <div className="flex items-center gap-2">
              <BellElectric className="w-5 h-5 text-highlight" />
              <span className="font-medium">Trạng thái:</span>
              <span>{bill.appointment.status}</span>
            </div>

            <div className="flex items-center gap-2">
              <CircleDollarSign className="w-5 h-5 text-highlight" />
              <span className="font-medium">Giá:</span>
              <span>{bill.price.toLocaleString('vi-VN')} VNĐ</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            onClick={onClose}
            className="bg-gradient-to-r from-[#00b5f1] to-[#00e0ff] text-white px-3 py-1.5 rounded  transition-colors"
          >
            Đóng
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ModalMedicalBillDetail
