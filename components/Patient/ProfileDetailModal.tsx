import React from 'react'
import { Profile } from '@/types/interface'
import {
  Cable,
  Cake,
  CircleUser,
  FileDigit,
  History,
  Mails,
  Scroll,
  Smartphone,
} from 'lucide-react'
import { FaVenusMars } from 'react-icons/fa'

interface ProfileDetailModalProps {
  isOpen: boolean
  onClose: () => void
  profile: Profile
}

const ProfileDetailModal: React.FC<ProfileDetailModalProps> = ({
  isOpen,
  onClose,
  profile,
}) => {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg p-4 shadow-lg z-10 w-[50%] max-h-[90vh] overflow-y-auto">
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
            <ul className="list-none space-y-2">
              <li className="flex items-center gap-2">
                <CircleUser className="w-5 h-5 text-slate-400" />
                <span className="text-slate-400">Họ và tên:</span> {profile.name}
              </li>
              <li className="flex items-center gap-2">
                <Mails className="w-5 h-5 text-slate-400" />
                <span className="text-slate-400">Email:</span> {profile.email}
              </li>
              <li className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-slate-400" />
                <span className="text-slate-400">Số điện thoại:</span>
                {profile.phone ? profile.phone : 'N/A'}
              </li>
              <li className="flex items-center gap-2">
                <FaVenusMars className="w-5 h-5 text-slate-400" />
                <span className="text-slate-400">Giới tính:</span>
                {profile.gender === 'MALE'
                  ? 'Nam'
                  : profile.gender === 'FEMALE'
                    ? 'Nữ'
                    : 'Khác'}
              </li>
              <li className="flex items-center gap-2">
                <Cake className="w-5 h-5 text-slate-400" />
                <span className="text-slate-400">Ngày sinh:</span>
                {profile.birthDate
                  ? new Date(profile.birthDate).toLocaleDateString()
                  : 'N/A'}
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <ul className="list-none space-y-2">
              <li className="flex items-center gap-2">
                <Cable className="w-5 h-5 text-slate-400" />
                <span className="text-slate-400">Triệu chứng:</span>{' '}
                {profile.symptom || 'Không có'}
              </li>
              <li className="flex items-center gap-2">
                <History className="w-5 h-5 text-slate-400" />
                <span className="text-slate-400">Tiền sử bệnh:</span>{' '}
                {profile.pastMedicalHistory || 'Không có'}
              </li>
              <li className="flex items-center gap-2">
                <Scroll className="w-5 h-5 text-slate-400" />
                <span className="text-slate-400">Loại giấy tờ:</span>{' '}
                {profile.identificationType}
              </li>
              <li className="flex items-center gap-2">
                <FileDigit className="w-5 h-5 text-slate-400" />
                <span className="text-slate-400">Số giấy tờ:</span>{' '}
                {profile.identificationNumber}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            className="bg-gradient-to-r from-[#00b5f1] to-[#00e0ff] text-white px-3 py-1.5 rounded  transition-colors"
            onClick={onClose}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileDetailModal
