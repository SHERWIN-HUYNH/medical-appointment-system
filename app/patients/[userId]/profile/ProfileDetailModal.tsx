import React from 'react';
import { Profile } from '@/types/interface';
import {
  Cake,
  CircleUser,
  FileDigit,
  FlipVertical2,
  History,
  Mails,
  Scroll,
  Smartphone,
} from 'lucide-react';

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
      <div className="bg-white rounded-lg p-4 shadow-lg z-10 w-[40%] max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl text-primary font-bold">Chi tiết hồ sơ</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <CircleUser className="w-5 h-5 text-slate-400" />
              <span className="text-slate-400">Họ và tên:</span> {profile.name}
            </p>
            <p className="flex items-center gap-2">
              <Mails className="w-5 h-5 text-slate-400" />
              <span className="text-slate-400">Email:</span> {profile.email}
            </p>
            <p className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-slate-400" />
              <span className="text-slate-400">Số điện thoại:</span>
              {profile.phone ? profile.phone : 'N/A'}
            </p>
            <p className="flex items-center gap-2">
              <FlipVertical2 className="w-5 h-5 text-slate-400" />
              <span className="text-slate-400">Giới tính:</span>
              {profile.gender === 'MALE'
                ? 'Nam'
                : profile.gender === 'FEMALE'
                  ? 'Nữ'
                  : 'Khác'}
            </p>
            <p className="flex items-center gap-2">
              <Cake className="w-5 h-5 text-slate-400" />
              <span className="text-slate-400">Ngày sinh:</span>
              {profile.birthDate
                ? new Date(profile.birthDate).toLocaleDateString()
                : 'N/A'}
            </p>
            <p className="flex items-center gap-2">
              <History className="w-5 h-5 text-slate-400" />
              <span className="text-slate-400">Tiền sử bệnh:</span>{' '}
              {profile.pastMedicalHistory || 'Không có'}
            </p>
          </div>
          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <Scroll className="w-5 h-5 text-slate-400" />
              <span className="text-slate-400">Loại giấy tờ:</span>{' '}
              {profile.identificationType}
            </p>
            <p className="flex items-center gap-2">
              <FileDigit className="w-5 h-5 text-slate-400" />
              <span className="text-slate-400">Số giấy tờ:</span>{' '}
              {profile.identificationNumber}
            </p>

            {profile.identificationDocumentUrl && (
              <div className="mt-2">
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
            className="bg-gradient-to-r from-[#00b5f1] to-[#00e0ff] hover:from-[#67e0f3] hover:to-[#e7f1f2] text-white px-3 py-1.5 rounded  transition-colors"
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
