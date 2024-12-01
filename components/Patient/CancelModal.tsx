import React from 'react'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'

interface CancelModalProps {
  onClose: () => void
  onSubmit: () => void
  cancelReason: string
  setCancelReason: (reason: string) => void
  isLoading?: boolean
}

const CancelModal: React.FC<CancelModalProps> = ({
  onClose,
  onSubmit,
  cancelReason,
  setCancelReason,
  isLoading = false,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg h-auto">
        <h2>Lý do hủy hẹn</h2>
        <Textarea
          value={cancelReason}
          onChange={(e) => setCancelReason(e.target.value)}
          placeholder="Vui lòng nhập lý do hủy lịch hẹn..."
          disabled={isLoading}
        />
        <div className="modal-buttons mt-4 flex justify-end gap-2">
          <Button
            className="bg-primary hover:bg-primary/90 text-white"
            onClick={onSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Đang xử lý...' : 'Xác nhận'}
          </Button>
          <Button
            className="bg-gray-200 hover:bg-slate-500 hover:text-white text-slate-700"
            onClick={onClose}
            disabled={isLoading}
          >
            Hủy
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CancelModal
