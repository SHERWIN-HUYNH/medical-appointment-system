'use client';
import React from 'react';
import Header from '../homepage/Header';
import Footer from '../homepage/Footer';
import { Button } from '@/components/ui/button';
import { Select, SelectItem, SelectTrigger, SelectContent } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { FormProvider, useForm } from 'react-hook-form';

// Giả lập dữ liệu danh sách bác sĩ
const doctors = [
  {
    id: 1,
    name: 'Dr. Nguyễn Văn A',
    degree: 'Tiến sĩ',
    specialty: 'Tim mạch',
    image: 'https://i.pinimg.com/736x/9f/32/20/9f3220f4535dd9cd9743b995fdfdeaa1.jpg',
    description: 'Bác sĩ với nhiều năm kinh nghiệm trong lĩnh vực tim mạch.',
  },
  {
    id: 2,
    name: 'Dr. Trần Thị B',
    degree: 'Phó giáo sư',
    specialty: 'Nhi',
    image: 'https://i.pinimg.com/736x/9f/32/20/9f3220f4535dd9cd9743b995fdfdeaa1.jpg',
    description:
      'Chuyên gia đầu ngành trong lĩnh vực nhi khoa, từng công tác tại nhiều bệnh viện lớn.',
  },
  {
    id: 3,
    name: 'Dr. Lê Văn C',
    degree: 'Thạc sĩ',
    specialty: 'Nội tiết',
    image: 'https://i.pinimg.com/736x/9f/32/20/9f3220f4535dd9cd9743b995fdfdeaa1.jpg',
    description:
      'Bác sĩ giàu kinh nghiệm trong điều trị các bệnh liên quan đến nội tiết.',
  },
];

const Doctor = () => {
  const formMethods = useForm(); // Khởi tạo hook form

  return (
    <div>
      <Header />

      {/* Slogan và Hình ảnh */}
      <div className="relative flex flex-col items-center mt-6">
        <img
          src="https://myshifts.work/wp-content/uploads/layerslider/SFT-Header/SFT-Banner3-1.jpg"
          alt="Team of Doctors"
          className="mt-11 w-full h-45 object-fill object-top" // Đặt phần hiển thị ở trên cùng của ảnh
        />
        <div className=" mt-3 h-25 absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2   text-black text-left bg-white p-2 rounded-2xl">
          <h1 className="mt-3 text-primary text-2xl font-semibold">
            ĐẶT KHÁM THEO BÁC SĨ
          </h1>
          <p className="text-lg ">
            Chủ động chọn bác sĩ mà bạn tin tưởng, an tâm khám bệnh
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-12 bg-slate-100 pt-1.5 pb-4">
        <div className="w-2/3 mt-4 bg-white p-2 rounded-2xl shadow-md">
          <FormProvider {...formMethods}>
            <form className="flex justify-center items-center gap-4">
              <span className="text-slate-300 text-sm">
                <Search />
              </span>
              <Input
                type="text"
                placeholder="Tìm kiếm bác sĩ"
                className="p-2 w-5/6 text-sm border-white rounded-xl focus:ring-white"
              />

              <Select>
                <SelectTrigger className="w-1/5 p-2 text-xs border-white hover:text-primary rounded-xl focus:outline-none focus:ring-white">
                  Tùy chọn hiển thị
                </SelectTrigger>
                <SelectContent className="bg-white border-white">
                  <SelectItem className="hover:text-primary" value="all">
                    Tất cả
                  </SelectItem>
                  <SelectItem className="hover:text-primary" value="online">
                    Bác sĩ trực tuyến
                  </SelectItem>
                  <SelectItem className="hover:text-primary" value="offline">
                    Bác sĩ ngoại tuyến
                  </SelectItem>
                </SelectContent>
              </Select>

              <Button className="hover:text-white hover:bg-sky-500 transition-all ease-out duration-200">
                Tìm kiếm
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>

      {/* Danh mục bác sĩ */}
      <div className="flex justify-center bg-slate-100 py-6">
        <div className="w-5/6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white p-4 rounded-lg shadow-md transition-all duration-200 ease-out transform hover:scale-105 hover:border-primary border border-transparent"
            >
              {/* Thông tin bác sĩ */}
              <div className="flex items-center">
                {/* Hình ảnh bác sĩ */}
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-lg object-cover mr-4"
                />

                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-primary">{doctor.name}</h3>
                  <p className="text-sm text-slate-500 mt-2">
                    <span className="font-bold">Học hàm:</span> {doctor.degree}
                  </p>
                  <p className="text-sm text-slate-500">
                    <span className="font-bold">Chuyên khoa:</span> {doctor.specialty}
                  </p>
                  <p className="text-sm text-slate-500">
                    <span className="font-bold">Giới thiệu:</span> {doctor.description}
                  </p>
                </div>
              </div>
              <hr className=" mt-2 text-slate-300 justify-center mx-auto" />
              {/* Nút đặt khám */}
              <div className="flex justify-end mt-2">
                <Button className="w-32 hover:text-white hover:bg-sky-500 rounded-3xl transition-all ease-out duration-200">
                  Đặt khám
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Doctor;
