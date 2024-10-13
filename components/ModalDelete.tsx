import React from "react";

type ModalProps = {
  showModal: boolean;
  onClose: () => void;
  onConfirm: () => void;
  label: string; // Thêm prop này
};

const ModalDelete = ({ showModal, onClose, onConfirm, label }: ModalProps) => {
  if (!showModal) return null; // Không render modal nếu không cần thiết

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-1/3">
        <p>
          Bạn có chắc chắn muốn xóa <strong>{label}</strong> này không?
        </p>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
