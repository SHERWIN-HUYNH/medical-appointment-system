import { bills, userData } from '@/lib/data'
import { CircleDollarSign, CreditCard, MapPinHouse, UserRoundPen } from 'lucide-react'
import React from 'react'

const PaymentHistory = () => {
  // Hàm tìm tên user từ userId
  const getUserName = (userId: string) => {
    // Tìm đối tượng chuyên khoa có id khớp với userId
    const user = userData.find((u) => u.id === userId)

    // Kiểm tra nếu user tồn tại
    if (user) {
      return user.name // Trả về tên của người dùng nếu tìm thấy
    } else {
      return 'NULL' // Trả về "NULL" nếu không tìm thấy người dùng
    }
  }
  return (
    <div>
      <div className="mt-5">
        {bills.length > 0 ? (
          bills.map((bill) => (
            <div
              key={bill.id}
              className="relative bg-gray-50 p-4 text-sm rounded-lg shadow-md transition-all ease-in-out duration-100 cursor-pointer mb-4"
            >
              {/* Status Badge in Top-Right */}
              <div
                className={`absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full ${
                  bill.status === 1
                    ? 'bg-green-100 text-green-600'
                    : 'bg-red-100 text-red-600'
                }`}
              >
                {bill.status === 1 ? 'Thành công' : 'Thất bại'}
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
                <div>
                  <p className="text-blue-400 mt-2 text-md flex items-center gap-2">
                    <UserRoundPen className="w-4 h-4" />
                    <span className="uppercase font-semibold">
                      {getUserName(bill.userId)}
                    </span>
                  </p>
                  <p className="mt-2 text-md flex items-center gap-2">
                    <CircleDollarSign className="w-4 h-4" />
                    <span>Số tiền:</span>
                    <span className="text-green-700 font-semibold">{bill.amount}</span>
                  </p>
                  <p className="mt-2 text-md flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    <span className="w-full">Tên bác sĩ: Nguyễn Quang Đại</span>
                  </p>
                  <p className="mt-2 text-md flex items-center gap-2">
                    <MapPinHouse className="w-4 h-4" />
                    <span className="w-full">Ngày thanh toán: {bill.createAt}</span>
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-slate-400 text-xs">Không có lịch sử thanh toán nào.</p>
        )}
      </div>
    </div>
  )
}

export default PaymentHistory
