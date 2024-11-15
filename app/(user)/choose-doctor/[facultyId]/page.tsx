'use client';
import React, { useState, useEffect } from 'react';
import UserLayout from '@/components/Layouts/userLayout';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { academicTitles } from '@/lib/data';
import { shortenTitle } from '@/lib/utils';
import { getDayOfWeek } from '@/lib/utils';

interface Doctor {
  id: string;
  name: string;
  academicTitle: string;
  description?: string;
  image?: string;
  faculty?: {
    name: string;
  };
  gender?: boolean;
  scheduleDays?: string[];
}

interface Faculty {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

const ChooseDoctor = ({ params }: { params: { facultyId: string } }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [faculty, setFaculty] = useState<Faculty>({
    id: params.facultyId,
    name: '',
    description: '',
    image: '',
  });
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedGender, setSelectedGender] = useState<string>('');

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await fetch(`/api/faculty/${params.facultyId}`);
        const facultyData = await res.json();

        if (facultyData) {
          setFaculty({
            id: facultyData.id,
            name: facultyData.name,
            description: facultyData.description,
            image: facultyData.image,
          });
        }
      } catch (error) {
        console.error('Error fetching faculty:', error);
      }
    };

    const fetchDoctors = async () => {
      try {
        const res = await fetch(`/api/doctor/faculty/${params.facultyId}`);
        const doctorsData = await res.json();

        if (Array.isArray(doctorsData)) {
          setDoctors(doctorsData);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    if (params.facultyId) {
      fetchFaculty();
      fetchDoctors();
    }
  }, [params.facultyId]);

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTitle = selectedTitle ? doctor.academicTitle === selectedTitle : true;
    const matchesGender = selectedGender
      ? selectedGender === 'true'
        ? doctor.gender
        : !doctor.gender
      : true;
    return matchesSearch && matchesTitle && matchesGender;
  });

  // Thêm hàm để xác định text hiển thị
  const getDisplayText = () => {
    if (selectedTitle === '') {
      return 'Học hàm/học vị';
    }
    return shortenTitle(selectedTitle);
  };

  // Cập nhật state và xử lý onChange
  const handleTitleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTitle(e.target.value);
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGender(e.target.value);
  };

  return (
    <div className="bg-[#e8f2f7] w-full h-min flex flex-col items-center justify-center">
      <UserLayout>
        <section className="flex space-x-7 max-w-screen-xl px-4 pb-4 mt-5">
          <div className="w-[300px] rounded-lg bg-white h-max flex-shrink-0">
            <h1 className="blue-header w-full">Thông tin khám</h1>
            <ul className="px-3 py-2 flex flex-col gap-2">
              {/* Hospital Info */}
              <li className="text-16-normal flex">
                <div className="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-hospital"
                  >
                    <path d="M12 6v4" />
                    <path d="M14 14h-4" />
                    <path d="M14 18h-4" />
                    <path d="M14 8h-4" />
                    <path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" />
                    <path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18" />
                  </svg>
                </div>
                <div className="flex justify-center flex-col text-sm">
                  <p>Bệnh viện Đại học Y Dược TP.HCM</p>
                  <p className="text-[#858585] text-xs">
                    Cơ sở 201 Nguyễn Chí Thanh, Phường 12, Quận 5, TP. Hồ Chí Minh
                  </p>
                </div>
              </li>
              {/* Faculty Info */}
              <li className="text-16-normal flex">
                <div className="flex justify-center text-sm gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-stethoscope"
                  >
                    <path d="M11 2v2" />
                    <path d="M5 2v2" />
                    <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" />
                    <path d="M8 15a6 6 0 0 0 12 0v-3" />
                    <circle cx="20" cy="10" r="2" />
                  </svg>
                  <p>Chuyên khoa: {faculty.name}</p>
                </div>
              </li>
            </ul>
          </div>

          <main className="w-[700px] bg-white flex flex-col h-min justify-between overflow-hidden flex-shrink-0">
            <h1 className="blue-header w-full text-sm">Vui lòng chọn bác sĩ</h1>
            <div className="p-3">
              <div className="relative mb-3">
                <input
                  type="text"
                  placeholder="Tìm nhanh bác sĩ"
                  className="w-full p-1.5 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary rounded-md pl-8 text-sm transition-colors"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>

              <div className="mb-3 flex gap-2">
                <select
                  value={selectedTitle}
                  onChange={handleTitleChange}
                  className="custom-select"
                >
                  <option value="" className={selectedTitle === '' ? 'hidden' : ''}>
                    {getDisplayText()}
                  </option>
                  <option value="">Tất cả</option>
                  {academicTitles.map((title) => (
                    <option key={title.id} value={title.name}>
                      {shortenTitle(title.name)}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedGender}
                  onChange={handleGenderChange}
                  className="custom-select"
                >
                  <option value="">
                    {selectedGender === '' ? 'Giới tính' : 'Tất cả'}
                  </option>
                  <option value="true">Nam</option>
                  <option value="false">Nữ</option>
                </select>
              </div>

              <div className="flex flex-col gap-3 h-[280px] overflow-y-auto custom-scrollbar bg-white px-1">
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className="p-4 hover:bg-slate-50 cursor-pointer rounded-lg border border-slate-200 shadow-sm bg-white transition-all hover:shadow-md"
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="0.88em"
                            height="1em"
                            viewBox="0 0 448 512"
                          >
                            <path
                              fill="#002aff"
                              d="M224 256a128 128 0 1 0 0-256a128 128 0 1 0 0 256m-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512h388.6c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1V362c27.6 7.1 48 32.2 48 62v40c0 8.8-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16s7.2-16 16-16v-24c0-17.7-14.3-32-32-32s-32 14.3-32 32v24c8.8 0 16 7.2 16 16s-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16v-40c0-29.8 20.4-54.9 48-62v-57.1q-9-.9-18.3-.9h-91.4q-9.3 0-18.3.9v65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7zM144 448a24 24 0 1 0 0-48a24 24 0 1 0 0 48"
                            />
                          </svg>
                          <span className="font-semibold text-sm text-blue-700">
                            {shortenTitle(doctor.academicTitle)}. {doctor.name}
                          </span>
                        </div>

                        <div className="text-xs text-gray-600 space-y-1">
                          <div className="flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-slate-400"
                            >
                              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                              <path d="M6 12v5c3 3 9 3 12 0v-5" />
                            </svg>
                            <span>Học hàm/học vị: {doctor.academicTitle}</span>
                          </div>

                          <div className="flex items-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-stethoscope text-slate-400"
                            >
                              <path d="M11 2v2" />
                              <path d="M5 2v2" />
                              <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" />
                              <path d="M8 15a6 6 0 0 0 12 0v-3" />
                              <circle cx="20" cy="10" r="2" />
                            </svg>
                            <span>Chuyên khoa: {faculty.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="16"
                              width="16"
                              viewBox="0 0 640 512"
                            >
                              <path
                                fill="#a4a2a2"
                                d="M176 288a112 112 0 1 0 0-224 112 112 0 1 0 0 224zM352 176c0 86.3-62.1 158.1-144 173.1l0 34.9 32 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0 0 32c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-32-32 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l32 0 0-34.9C62.1 334.1 0 262.3 0 176C0 78.8 78.8 0 176 0s176 78.8 176 176zM271.9 360.6c19.3-10.1 36.9-23.1 52.1-38.4c20 18.5 46.7 29.8 76.1 29.8c61.9 0 112-50.1 112-112s-50.1-112-112-112c-7.2 0-14.3 .7-21.1 2c-4.9-21.5-13-41.7-24-60.2C369.3 66 384.4 64 400 64c37 0 71.4 11.4 99.8 31l20.6-20.6L487 41c-6.9-6.9-8.9-17.2-5.2-26.2S494.3 0 504 0L616 0c13.3 0 24 10.7 24 24l0 112c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-33.4-33.4L545 140.2c19.5 28.4 31 62.7 31 99.8c0 97.2-78.8 176-176 176c-50.5 0-96-21.3-128.1-55.4z"
                              />
                            </svg>
                            <span>Giới tính: {doctor.gender ? 'Nam' : 'Nữ'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-slate-400"
                            >
                              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                              <line x1="16" x2="16" y1="2" y2="6" />
                              <line x1="8" x2="8" y1="2" y2="6" />
                              <line x1="3" x2="21" y1="10" y2="10" />
                            </svg>
                            <span>Lịch khám: {doctor.scheduleDays?.map(day => getDayOfWeek(day)).join(', ') || 'Chưa có lịch khám'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    Không tìm thấy bác sĩ nào
                  </div>
                )}
              </div>

              <div className="mt-3 border-t pt-3">
                <Button
                  onClick={() => router.push('/choose-faculty')}
                  className="text-sm bg-transparent text-slate-500 hover:text-primary flex items-center gap-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m12 19-7-7 7-7" />
                    <path d="M19 12H5" />
                  </svg>
                  Quay lại
                </Button>
              </div>
            </div>
          </main>
        </section>
      </UserLayout>
    </div>
  );
};

export default ChooseDoctor;
