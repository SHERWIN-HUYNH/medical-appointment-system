
'use client';
import UserLayout from '@/components/Layouts/userLayout';
import { Button } from '@/components/ui/button';
import { Service } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { fetchServices } from '@/helpers/servicesApi';

const ChooseService = ({ params }: { params: { facultyId: string } }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [services, setServices] = useState<Service[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const doctorName = searchParams.get("doctorName");
  const doctorId = searchParams.get("doctorId");
  const facultyId = params.facultyId;
  const facultyName = searchParams.get("facultyName");

  useEffect(() => {
    const loadServices = async () => {
      const data = await fetchServices(facultyId); 
      setServices(data);
    };

    if (facultyId) {
      loadServices();
    }
  }, [facultyId]);

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <UserLayout>
      <section className="flex space-x-7 max-w-screen-xl px-4 pb-4 mt-5">
        <div className="w-[300px] rounded-lg bg-white h-max flex-shrink-0">
          <h1 className="blue-header w-full">Thông tin khám</h1>
          <ul className="card-body">
            <li className="card-item">
              <p className="mt-[6px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hospital">
                  <path d="M12 6v4" />
                  <path d="M14 14h-4" />
                  <path d="M14 18h-4" />
                  <path d="M14 8h-4" />
                  <path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" />
                  <path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18" />
                </svg>
              </p>
              <p>
                Bệnh Viện Quận Bình Thạnh<br />
                <span className="text-[#8a8a8a]">
                  132 Lê Văn Duyệt, Phường 1, Bình Thạnh, Thành phố Hồ Chí Minh
                </span>
              </p>
            </li>
            <li className="card-item">
              <p className="mt-[6px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-stethoscope">
                  <path d="M11 2v2" />
                  <path d="M5 2v2" />
                  <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" />
                  <path d="M8 15a6 6 0 0 0 12 0v-3" />
                  <circle cx="20" cy="10" r="2" />
                </svg>
              </p>
              <p>
                Chuyên khoa: <span className="text-[#8a8a8a]">{facultyName}</span>
              </p>
            </li>
            <li className="card-item">
              <p className="mt-[6px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart-pulse">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
                </svg>
              </p>
              <p>
                Bác sĩ: <span className="text-[#8a8a8a]">{doctorName}</span>
              </p>
            </li>
          </ul>
        </div>
        <main className="w-[700px] bg-white flex flex-col h-min justify-between overflow-hidden flex-shrink-0">
          <h1 className="blue-header w-full text-sm">Vui lòng chọn dịch vụ</h1>
          <div className="p-3">
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Tìm nhanh dịch vụ"
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
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <div key={service.id} className="flex items-center justify-between">
                    <div className="text-sm">{service.name}</div>
                    <Button
                      className="text-sm"
                      onClick={() => router.push(`/doctor/${doctorId}/schedule?serviceId=${service.id}`)}
                    >
                      Chọn
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center text-slate-400 py-6 text-base">Không có dịch vụ</div>
              )}
            </div>
            <div className="mt-3 border-t pt-3 flex justify-between">
              <Button className="py-2 text-sm w-full">Hủy</Button>
            </div>
          </div>
        </main>
      </section>
    </UserLayout>
  );
};

export default ChooseService;
