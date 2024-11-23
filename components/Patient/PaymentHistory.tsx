import { formatDateToVN } from '@/helpers/formatTimeSlots'
import { BillInfor } from '@/types/interface'
import { BillStatus } from '@prisma/client'
import {
  CircleDollarSign,
  ClipboardPlus,
  CreditCard,
  MapPinHouse,
  Syringe,
  UserRoundPen,
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import React from 'react'
interface Props {
  bills: BillInfor[] | undefined;
}
const PaymentHistory: React.FC<Props> = ({bills}) => {
  const { data: session } = useSession()
  if(!bills) return  (<p className="text-slate-400 text-xs">Không có lịch sử thanh toán nào.</p>) 
  if (!session) {
    return <h1>Yeu cau dang nhap</h1>
  }
  
  console.log('BILLS', bills)
  return (
    <div>
      <div className="mt-5">
        {
          bills.map((bill) => (
            <div
              key={bill.id}
              className="relative bg-gray-50 p-4 text-sm rounded-lg shadow-md transition-all ease-in-out duration-100 cursor-pointer mb-4"
            >
              {/* Status Badge in Top-Right */}
              <div
                className={`absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full ${
                  bill.status === BillStatus.COMPLETED
                    ? 'bg-green-100 text-green-600'
                    : 'bg-red-100 text-red-600'
                }`}
              >
                {bill.status === BillStatus.COMPLETED ? 'Thành công' : 'Thất bại'}
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
                <div>
                  <p className="text-blue-400 mt-2 text-md flex items-center gap-2">
                    <UserRoundPen className="w-4 h-4" />
                    <span className="uppercase font-semibold">
                      {bill.appointment.profile.name}
                    </span>
                  </p>
                  <p className="mt-2 text-md flex items-center gap-2">
                    <CircleDollarSign className="w-4 h-4" />
                    <span>Số tiền:</span>
                    <span className="text-green-700 font-semibold">{bill.price}</span>
                  </p>
                  <p className="mt-2 text-md flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    <span className="w-full">
                      Tên bác sĩ: {bill.appointment.doctorSchedule.doctor.name}
                    </span>
                  </p>
                  <p className="mt-2 text-md flex items-center gap-2">
                    <MapPinHouse className="w-4 h-4" />
                    <span className="w-full">
                      Ngày thanh toán: {formatDateToVN(bill.createdAt)}
                    </span>
                  </p>
                  <p className="mt-2 text-md flex items-center gap-2">
                    <ClipboardPlus />
                    <span className="w-full">
                      Dịch vụ: {bill.appointment.Service.name}
                    </span>
                  </p>
                  <p className="mt-2 text-md flex items-center gap-2">
                    <Syringe />
                    <span className="w-full">
                      Chuyên khoa: {bill.appointment.doctorSchedule.doctor.faculty.name}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default PaymentHistory
