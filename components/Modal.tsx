import React from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  message: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg p-6 shadow-lg z-10 w-1/3">
        <h2 className="text-lg font-bold mb-4">Xác nhận</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            className="bg-slate-300 text-slate-700 px-4 py-2 rounded mr-2 hover:bg-slate-400"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500"
            onClick={onConfirm}
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
