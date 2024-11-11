import React from "react";
import { Profile } from "@/types/interface";

interface ProfileDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
}

const ProfileDetailModal: React.FC<ProfileDetailModalProps> = ({
  isOpen,
  onClose,
  profile,
}) => {
  if (!isOpen) return null;

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('vi-VN');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      
      {/* Thu nhỏ chiều rộng của modal */}
      <div className="bg-white rounded-lg p-4 shadow-lg z-10 w-[40%] max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl text-primary font-bold">Chi tiết hồ sơ</h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Giảm khoảng cách giữa các cột */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <p><span className=" text-primary ">Họ và tên:</span> {profile.name}</p>
            <p><span className=" text-primary ">Email:</span> {profile.email}</p>
            <p><span className="text-primary ">Số điện thoại:</span> {profile.phone}</p>
            <p><span className="text-primary ">Giới tính:</span> {
              profile.gender === 'MALE' ? 'Nam' : 
              profile.gender === 'FEMALE' ? 'Nữ' : 'Khác'
            }</p>
            <p><span className="text-primary ">Ngày sinh:</span> {formatDate(profile.birthDate)}</p>
            <p><span className="text-primary ">Tiền sử bệnh:</span> {profile.pastMedicalHistory || 'Không có'}</p>
          </div>
          <div className="space-y-2">
            <p><span className="text-primary ">Loại giấy tờ:</span> {profile.identificationType}</p>
            <p><span className="text-primary ">Số giấy tờ:</span> {profile.identificationNumber}</p>
           

            {/* Hiển thị hình ảnh giấy tờ với kích thước nhỏ */}
            {profile.identificationDocumentUrl && (
              <div className="mt-2">
                {/* <p className=" mb-1 text-primary ">Hình ảnh giấy tờ:</p> */}
                <img
                  src={profile.identificationDocumentUrl}
                  alt="Identification Document"
                  className="w-32 h-auto rounded-lg shadow-md" 
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            className="bg-blue-400 text-white px-3 py-1.5 rounded hover:bg-blue-500 transition-colors"
            onClick={onClose}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailModal;
