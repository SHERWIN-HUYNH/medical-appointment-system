'use client';
import React, { useState, useEffect } from 'react';
import Header from '../../homepage/Header';
import Footer from '../../homepage/Footer';
import { Button } from '@/components/ui/button';
import { useRouter, useParams } from 'next/navigation';

interface Doctor {
  id: string;
  name: string;
  academicTitle: string;
  image: string;
  description: string;
  isActive: boolean;
}

interface Faculty {
  id: string;
  name: string;
  description: string;
}

const ChooseDoctor = () => {
  const router = useRouter();
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [faculty, setFaculty] = useState<Faculty | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch faculty first
        const facultyResponse = await fetch(`/api/faculty/${params.facultyId}`);
        const facultyData = await facultyResponse.json();

        if (facultyData.success) {
          setFaculty(facultyData.data);
        }

        // Fetch doctors
        const doctorsResponse = await fetch(`/api/doctor/${params.facultyId}`);
        const doctorsData = await doctorsResponse.json();
        if (doctorsData.success) {
          setDoctors(doctorsData.data || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (params.facultyId) {
      fetchData();
    }
  }, [params.facultyId]);

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleDoctorClick = (doctorId: string) => {
    router.push(`/booking/${doctorId}`);
  };

  return (
    <div className="bg-[#e8f2f7] w-full h-min flex flex-col items-center justify-center mt-16">
      <Header />
      <section className="flex space-x-7 max-w-screen-xl px-4 pb-4 mt-5">
        {/* Left sidebar */}
        <div className="w-[300px] rounded-lg bg-white h-max flex-shrink-0">
          <h1 className="blue-header w-full">Thông tin khám</h1>
          <ul className="px-3 py-2 flex flex-col gap-2">
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
            <li className="text-sm flex items-center gap-2">
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
                className="text-gray-500"
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              </svg>
              <span className="text-[#858585]">Chuyên khoa: </span>
              <span className="text-primary font-medium">
                {faculty?.name || 'Đang tải...'}
              </span>
            </li>
          </ul>
        </div>

        {/* Main content */}
        <main className="w-[700px] bg-white flex flex-col h-min justify-between overflow-hidden flex-shrink-0">
          <h1 className="blue-header w-full text-sm">Vui lòng chọn bác sĩ</h1>
          <div className="p-3">
            {/* Search box */}
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Tìm nhanh bác sĩ"
                className="w-full p-1.5 border rounded-md pl-8 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                width="20"
                height="20"
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

            {/* Doctors list */}
            <div className="flex flex-col gap-1 h-[280px] overflow-y-auto custom-scrollbar">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    onClick={() => handleDoctorClick(doctor.id)}
                    className="p-3 hover:bg-gray-50 cursor-pointer border-b border-slate-200"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-sm text-primary">
                          {doctor.academicTitle} {doctor.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          {doctor.description}
                        </p>
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

            {/* Back button */}
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
      <Footer />
    </div>
  );
};

export default ChooseDoctor;
