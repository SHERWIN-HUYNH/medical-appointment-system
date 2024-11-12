'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Pagination from '@/components/Pagination';
import UserLayout from '@/components/Layouts/userLayout';

interface Doctor {
  id: string;
  name: string;
  academicTitle: string;
  image: string;
  description: string;
  facultyName: string;
}
interface Faculty {
  id: string;
  name: string;
}

const Doctor = () => {
  const formMethods = useForm();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedfaculty, setSelectedfaculty] = useState('');
  const [faculties, setfaculties] = useState<Faculty[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('/api/doctor/user');
        const data = await response.json();
        if (response.ok) {
          setDoctors(data);
          setFilteredDoctors(data);
        } else {
          toast.error('Lỗi khi tải dữ liệu bác sĩ');
        }
      } catch (error) {
        console.log('ERROR', error);
        toast.error('Lỗi khi kết nối với máy chủ');
      }
    };

    const fetchFaculties = async () => {
      try {
        const response = await fetch('/api/faculty');
        const data = await response.json();
        setfaculties(data);
      } catch (error) {
        console.log('ERROR', error);
        toast.error('Lỗi khi tải dữ liệu chuyên khoa');
      }
    };

    fetchDoctors();
    fetchFaculties();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    filterDoctors(e.target.value, selectedTitle, selectedfaculty);
  };

  const handleTitleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTitle(e.target.value);
    filterDoctors(searchQuery, e.target.value, selectedfaculty);
  };

  const handlefacultyFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedfaculty(e.target.value);
    filterDoctors(searchQuery, selectedTitle, e.target.value);
  };

  const filterDoctors = (query: string, title: string, faculty: string) => {
    const filtered = doctors.filter((doctor) => {
      const matchesSearch = doctor.name.toLowerCase().includes(query.toLowerCase());
      const matchesTitle = title ? doctor.academicTitle === title : true;
      const matchesfaculty = faculty ? doctor.facultyName === faculty : true;
      return matchesSearch && matchesTitle && matchesfaculty;
    });
    setFilteredDoctors(filtered);
    setCurrentPage(1); // Reset to first page on new filter
  };

  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
  const displayedDoctors = filteredDoctors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <UserLayout>
  
      <div className="flex justify-center mt-12 bg-slate-100 pt-1.5 pb-4">
        <div className="w-3/4 mt-6 bg-white p-2 rounded-2xl shadow-md">
          <FormProvider {...formMethods}>
            <form className="flex justify-center items-center gap-4">
              <Input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Tìm kiếm bác sĩ"
                className="p-2 w-5/6 text-sm border-white rounded-xl focus:ring-white"
              />
              <select
                value={selectedTitle}
                onChange={handleTitleFilter}
                className="p-2 text-sm text-primary border-white focus:ring-white rounded-xl"
              >
                <option value="">Học hàm</option>
                <option value="Thạc sĩ">Thạc sĩ</option>
                <option value="Tiến sĩ">Tiến sĩ</option>
                <option value="Giáo sư">Giáo sư</option>
              </select>
              <select
                value={selectedfaculty}
                onChange={handlefacultyFilter}
                className="p-2 text-sm text-primary border-white focus:ring-white rounded-xl"
              >
                <option value="">Chuyên khoa</option>
                {faculties.map((faculty) => (
                  <option key={faculty.id} value={faculty.name}>
                    {faculty.name}
                  </option>
                ))}
              </select>
              <Button className="text-white hover:bg-primary bg-gradient-to-r from-[#00b5f1] to-[#00e0ff] hover:from-[#67e0f3] hover:to-[#e7f1f2]">
                Tìm kiếm
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>

      <div className="flex justify-center bg-slate-100 py-6">
        <div className="w-5/6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {displayedDoctors.length > 0 ? (
            displayedDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white p-4 rounded-lg shadow-md hover:scale-105 hover:border-primary border border-transparent"
              >
                <div className="flex items-center">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-24 h-24 rounded-lg object-cover mr-4"
                  />
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-primary">{doctor.name}</h3>
                    <p className="text-sm text-slate-500 mt-2">
                      <span className="font-bold">Học hàm:</span> {doctor.academicTitle}
                    </p>
                    <p className="text-sm text-slate-500">
                      <span className="font-bold">Chuyên khoa:</span> {doctor.facultyName}
                    </p>
                    <p className="text-sm text-slate-500">
                      <span className="font-bold">Giới thiệu:</span> {doctor.description}
                    </p>
                  </div>
                </div>
                <hr className="mt-2 text-slate-300" />
                <div className="flex justify-end mt-2">
                  <Button className="w-32 text-white bg-gradient-to-r from-[#00b5f1] to-[#00e0ff] hover:from-[#67e0f3] hover:to-[#e7f1f2] rounded-3xl">
                    Đặt khám
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-slate-500">Không tìm thấy bác sĩ phù hợp.</p>
          )}
        </div>
      </div>

      <div className="flex bg-slate-100 justify-center ">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

  
    </UserLayout>
  );
};

export default Doctor;
