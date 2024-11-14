'use client';
import UserLayout from '@/components/Layouts/userLayout';
import { Button } from '@/components/ui/button';
import { Service } from '@prisma/client';
import { useState, useEffect } from 'react';

const ChooseService = () => {
  const [searchQuery, setSearchQuery] = useState('');
  // const [services, setServices] = useState<Service[]>([service]);

  const services = [
    {
      id: '1',
      name: 'Khám Tim mạch',
      description:
        'Khám và điều trị các bệnh lý về tim mạch, bao gồm huyết áp cao, rối loạn nhịp tim, và suy tim.',
      price: 500000, // Giá dịch vụ
    },
    {
      id: '2',
      name: 'Chụp X-quang',
      description: 'Dịch vụ chụp X-quang để phát hiện các vấn đề về xương và phổi.',
      price: 300000,
    },
    {
      id: '3',
      name: 'Khám Sản phụ khoa',
      description:
        'Chăm sóc sức khỏe phụ nữ, bao gồm khám thai, kiểm tra sức khỏe phụ khoa định kỳ.',
      price: 450000,
    },
    {
      id: '4',
      name: 'Siêu âm thai',
      description: 'Siêu âm để theo dõi sự phát triển của thai nhi trong suốt thai kỳ.',
      price: 600000,
    },
    {
      id: '5',
      name: 'Khám Nhi khoa',
      description:
        'Khám và điều trị các bệnh lý về trẻ em, từ sơ sinh đến thanh thiếu niên.',
      price: 400000,
    },
    {
      id: '6',
      name: 'Khám Răng hàm mặt',
      description:
        'Khám và điều trị các vấn đề về răng miệng, bao gồm trám răng, chữa tủy, và làm răng giả.',
      price: 350000,
    },
    {
      id: '7',
      name: 'Khám Hô hấp',
      description:
        'Khám và điều trị các bệnh lý về hệ hô hấp như hen suyễn, viêm phổi, và bệnh phổi mãn tính.',
      price: 450000,
    },
    {
      id: '8',
      name: 'Khám Nội tiết',
      description:
        'Điều trị các bệnh lý về tuyến giáp, tiểu đường, và các vấn đề nội tiết khác.',
      price: 500000,
    },
    {
      id: '9',
      name: 'Chụp CT Scanner',
      description:
        'Chụp cắt lớp vi tính (CT scan) để kiểm tra các bệnh lý trong cơ thể, bao gồm các bệnh về não và bụng.',
      price: 800000,
    },
    {
      id: '10',
      name: 'Khám Mắt',
      description:
        'Khám và điều trị các bệnh lý về mắt, bao gồm cận thị, viễn thị, và các bệnh lý khác của mắt.',
      price: 350000,
    },
  ];

  // useEffect(() => {
  //   const fetchServices = async () => {
  //     try {
  //       const response = await fetch('/api/service/user');
  //       const data = await response.json();
  //       setServices(data || []);
  //     } catch (error) {
  //       console.log(error);
  //       setServices([]);
  //     }
  //   };
  //   fetchServices();
  // }, []);

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <UserLayout>
      <section className="flex space-x-7 max-w-screen-xl px-4 pb-4 mt-5">
        <div className="w-[300px] rounded-lg bg-white h-max flex-shrink-0">
          <h1 className="blue-header w-full">Thông tin khám</h1>
          <ul className="card-body">
            <li className="card-item">
              <p className="mt-[6px]">
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
              </p>
              <p>
                Bệnh Viện Quận Bình Thạnh<br></br>
                <span className="text-[#8a8a8a]">
                  132 Lê Văn Duyệt, Phường 1, Bình Thạnh, Thành phố Hồ Chí Minh
                </span>
              </p>
            </li>
            <li className="card-item">
              <p className="mt-[6px]">
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
              </p>
              <p>
                Chuyên khoa: <span className="text-[#8a8a8a]">Chuẩn đoán hình ảnh</span>
              </p>
            </li>
            <li className="card-item">
              <p className="mt-[6px]">
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
                  className="lucide lucide-heart-pulse"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
                </svg>
              </p>
              <p>
                Bác sĩ: <span className="text-[#8a8a8a]">Trần Thanh Trường</span>
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
              {filteredServices && filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <div
                    key={service.id}
                    className="grid grid-cols-3 gap-2 pt-1 pb-2 px-3  text-slate-500 cursor-pointer border-b border-slate-200 transition-all duration-300 ease-in-out"
                  >
                    <div className="mt-1 text-sm">{service.name}</div>
                    <div className="text-sm  mt-1  text-slate-500">
                      Giá: {service.price.toLocaleString()} VND
                    </div>
                    <div className="flex justify-center items-center">
                      <Button className="text-xs w-min h-min text-slate-500 bg-white border border-slate-500 rounded-md hover:bg-gradient-to-r from-[#00b5f1] to-[#00e0ff] hover:text-white">
                        Chọn
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-slate-500">
                  Không tìm thấy dịch vụ nào
                </div>
              )}
            </div>
            <div className="mt-3 border-t pt-3 flex justify-between">
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
  );
};

export default ChooseService;
