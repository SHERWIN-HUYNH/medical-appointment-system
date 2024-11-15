'use client';
import React, { useState, useEffect } from 'react';
import UserLayout from '@/components/Layouts/userLayout';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import path from 'path';

interface Doctor {
  id: string;
  name: string;
  academicTitle: string;
  description?: string;
  image?: string;
  faculty?: {
    name: string;
  };
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

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="bg-[#e8f2f7] w-full h-min flex flex-col items-center justify-center">
      <UserLayout>
        <section className="flex space-x-7 max-w-screen-xl px-4 pb-4 mt-5">
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
              {/* Faculty Info */}
              <li className="text-16-normal flex">
                <div className="mr-2"></div>
                <div className="flex justify-center flex-col text-sm">
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

              <div className="flex flex-col gap-1 h-[280px] overflow-y-auto custom-scrollbar bg-white">
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doctor) => (
                    <Link
                      key={doctor.id}
                      href={{
                        pathname: `/choose-service`,
                        query: {
                          doctorId: doctor.id,
                          doctorName: doctor.name,
                          facultyId: faculty.id,
                          facultyName: faculty.name,
                        },
                      }}
                      className="py-2 px-3 hover:bg-slate-50 text-slate-500 hover:text-primary cursor-pointer border-b border-slate-200 transition-all duration-300 ease-in-out"
                    >
                      <div className="font-medium mb-0.5 text-sm">
                        {doctor.academicTitle} {doctor.name}
                      </div>
                      {doctor.description && (
                        <div className="text-[11px] mt-1 italic">
                          {doctor.description}
                        </div>
                      )}
                    </Link>
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
