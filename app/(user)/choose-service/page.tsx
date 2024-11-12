'use client';
import UserLayout from '@/components/Layouts/userLayout'
import { Button } from '@/components/ui/button';
import { Service } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const ChooseService = () => {
  // const { data: session } = useSession();
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const facultyName = searchParams.get("facultyName");
  const [searchQuery, setSearchQuery] = useState('');
  const [faculties, setFaculties] = useState<Service[]>([]);


  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await fetch('/api/faculty');
        const data = await response.json();
        setFaculties(data || []);
      } catch (error) {
        console.log(error);
        setFaculties([]);
      }
    };
    fetchFaculties();
  }, []);

  const filteredFaculties = faculties.filter((faculty) =>
    faculty.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  return (
    <UserLayout>
      <section className="flex space-x-7 max-w-screen-xl px-4 pb-4 mt-5">
        <div className="w-[300px] rounded-lg bg-white h-max flex-shrink-0">
          <h1 className="blue-header w-full">Thông tin khám</h1>
          <ul className="card-body">
            <li className="card-item">
              <p className=' mt-[6px]'>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-hospital"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="10" r="3" />
                  <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
                </svg>
              </p>
              <p>Bệnh Viện Quận Bình Thạnh<br></br><span className=' text-[#8a8a8a]'>132 Lê Văn Duyệt, Phường 1, Bình Thạnh, Thành phố Hồ Chí Minh</span></p>
            </li>
            <li className="card-item">
            <p className=' mt-[6px]'>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-smartphone"
                >
                  <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                  <path d="M12 18h.01" />
                </svg>
              </p>
              <p>Chuyên khoa: <span className=' text-[#8a8a8a]'>Chuẩn đoán hình ảnh</span></p>
            </li>
            <li className="card-item">
            <p className=' mt-[6px]'>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-map-pin-house"
                >
                  <path d="M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z" />
                  <path d="M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2" />
                  <path d="M18 22v-3" />
                  <circle cx="10" cy="10" r="3" />
                </svg>
              </p>
              <p>Bác sĩ: <span className=' text-[#8a8a8a]'>Trần Thanh trường</span></p>
            </li>
            </ul>
        </div>
        <main className="w-[700px] bg-white flex flex-col h-min justify-between overflow-hidden flex-shrink-0">
          <h1 className="blue-header w-full text-sm">Vui lòng chọn dịch vụ</h1>
          <div className="p-3">
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Tìm nhanh chuyên khoa"
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
              {filteredFaculties && filteredFaculties.length > 0 ? (
                filteredFaculties.map((faculty) => (
                  <div
                    key={faculty.id}
                    className="py-2 px-3 hover:bg-gray-50 text-slate-500 hover:text-primary cursor-pointer border-b border-slate-200 transition-all duration-300 ease-in-out"
                  >
                    <div className="font-medium mb-0.5 text-sm">{faculty.name}</div>
                    {faculty.description && (
                      <div className="text-[11px] mt-1 italic">{faculty.description}</div>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  Không tìm thấy chuyên khoa nào
                </div>
              )}
            </div>
            <div className="mt-3 border-t pt-3">
              <Button className="text-sm bg-transparent text-slate-500 hover:text-primary flex items-center gap-1">
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
  )
}

export default ChooseService
