'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ModalDelete from '@/components/ModalDelete';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import TableSearch from '@/components/TableSearch';
import {
  ArrowDownNarrowWide,
  CalendarRange,
  Pencil,
  SlidersHorizontal,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { academicTitles } from '@/lib/data';
import { toast } from 'sonner';

type Doctor = {
  id: string;
  name: string;
  academicTitle: string;
  image: string;
  description: string;
  facultyId: string;
};

type Faculty = {
  id: string;
  name: string;
};

const columns = [
  {
    header: 'STT',
    accessor: 'index',
    className: 'w-[8%] text-left pl-5',
  },
  {
    header: 'Bác sĩ',
    accessor: 'doctor',
    className: 'w-[20%] text-left pl-8',
  },
  {
    header: 'Học hàm/học vị',
    accessor: 'academicTitle',
    className: 'w-[20%] text-left pl-8',
  },
  {
    header: 'Chuyên khoa',
    accessor: 'facultyName',
    className: 'w-[20%] text-left pl-8',
  },
  {
    header: 'Hình ảnh',
    accessor: 'imageDoctor',
    className: 'w-[15%] text-left pl-8',
  },
  {
    header: 'Mô tả',
    accessor: 'description',
    className: 'w-[25%] text-left pl-8',
  },
];

const ListDoctor = () => {
  const [doctorData, setDoctorData] = useState<Doctor[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [showModal, setShowModal] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState<Doctor | null>(null);
  const [message, setMessage] = useState('');
  const [fadeOut, setFadeOut] = useState(false);
  const [selectedFaculties, setSelectedFaculties] = useState<string[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [sortOption, setSortOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [facultyData, setFacultyData] = useState<Faculty[]>([]);

  useEffect(() => {
    const fetchDoctorData = async () => {
      const response = await fetch(`/api/doctor`);

      if (response.ok) {
        const data = await response.json();
        setDoctorData(data);
      }
    };

    const fetchFacultyData = async () => {
      const response = await fetch(`/api/faculty`);
      if (response.ok) {
        const data = await response.json();
        setFacultyData(data);
      }
    };

    fetchDoctorData();
    fetchFacultyData();
  }, []);

  const getFacultyName = (facultyId: string) => {
    const faculty = facultyData.find((fac) => fac.id === facultyId);
    return faculty ? faculty.name : 'Unknown Faculty';
  };

  //function lấy tên academic title
  const getAcademicTitleName = (titleId: string) => {
    const title = academicTitles.find((title) => title.id === titleId);
    return title ? title.name : titleId;
  };

  const showMessage = (msg: string) => {
    setMessage(msg);
    setFadeOut(false);
    setTimeout(() => {
      setFadeOut(true);
    }, 2000);
  };

  const confirmDelete = async () => {
    if (!doctorToDelete) return;

    try {
      const response = await fetch(`/api/doctor`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ doctor: doctorToDelete }),
      });

      if (response.ok) {
        // Cập nhật state sau khi xóa thành công
        setDoctorData((prevData) =>
          prevData.filter((doctor) => doctor.id !== doctorToDelete.id),
        );
        toast.success(`Bác sĩ ${doctorToDelete.name} đã xóa thành công!`);
      } else {
        toast.error('Không thể xóa bác sĩ đang có lịch hẹn!');
      }
    } catch (error) {
      console.error('Error deleting doctor:', error);
      showMessage('Đã xảy ra lỗi khi xóa bác sĩ!');
    } finally {
      // Reset trạng thái
      setDoctorToDelete(null);
      setShowModal(false);
    }
  };

  const handleFacultyFilterChange = (facultyId: string) => {
    if (selectedFaculties.includes(facultyId)) {
      setSelectedFaculties(selectedFaculties.filter((id) => id !== facultyId));
    } else {
      setSelectedFaculties([...selectedFaculties, facultyId]);
    }
    setCurrentPage(1);
  };

  const filteredDoctorData = doctorData.filter((doctor) => {
    const matchesFaculty =
      selectedFaculties.length === 0 || selectedFaculties.includes(doctor.facultyId);
    const matchesSearchTerm = doctor.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesFaculty && matchesSearchTerm;
  });

  const totalPages = Math.ceil(filteredDoctorData.length / itemsPerPage);

  const displayedData = filteredDoctorData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Xử lý sắp xếp
  const handleSortOptionChange = (option: string) => {
    setSortOption(option);
    let sortedData = [...doctorData];

    const sortByName = (a: Doctor, b: Doctor) => {
      // Tách tên và họ
      const [firstNameA, lastNameA] = a.name.split(' ').slice(-1);
      const [firstNameB, lastNameB] = b.name.split(' ').slice(-1);

      // So sánh tên trước
      if (firstNameA !== firstNameB) {
        return firstNameA.localeCompare(firstNameB);
      }

      // Nếu tên giống nhau, so sánh họ
      return lastNameA.localeCompare(lastNameB);
    };

    if (option === 'A-Z') {
      sortedData = sortedData.sort((a, b) => sortByName(a, b));
    } else if (option === 'Z-A') {
      sortedData = sortedData.sort((a, b) => sortByName(b, a));
    }

    setDoctorData(sortedData);
  };

  // Tính toán số thứ tự dựa trên trang hiện tại
  const getSequentialNumber = (index: number) => {
    return (currentPage - 1) * itemsPerPage + index + 1;
  };

  // Thêm dữ liệu STT vào displayedData
  const dataWithIndex = displayedData.map((item, index) => ({
    ...item,
    index: getSequentialNumber(index),
  }));

  const renderRow = (item: Doctor & { index: number }) => (
    <tr
      key={item.id}
      className="h-15 border-b border-slate-200 even:bg-slate-50 text-sm hover:bg-blue-50"
    >
      <td className="text-left pl-7">{item.index}</td>
      <td className="text-left pl-8 truncate max-w-[200px]">{item.name}</td>
      <td className="text-left pl-8 truncate">
        {getAcademicTitleName(item.academicTitle)}
      </td>
      <td className="text-left pl-8 truncate">{getFacultyName(item.facultyId)}</td>
      <td className="text-left pl-8">
        <img
          src={`/assets/doctor/${item.image}`}
          alt={item.name}
          width={80}
          height={80}
          className="rounded object-cover"
        />
      </td>
      <td className="hidden md:table-cell text-left pl-8 line-clamp-2">
        {item.description}
      </td>
      <td className="pr-4">
        <div className="flex items-center gap-2">
          <Link href={`/test-doctor/${item.id}/schedule`}>
            <Button className="w-auto h-10 flex items-center justify-center rounded-full bg-green-300">
              <CalendarRange size={20} strokeWidth={1.75} color="white" />
            </Button>
          </Link>
          <Link href={`/test-doctor/edit-doctor?id=${item.id}`}>
            <Button className="w-12 h-10 flex items-center justify-center rounded-full bg-blue-300">
              <Pencil size={28} strokeWidth={3} color="white" />
            </Button>
          </Link>
          <Button
            className="w-12 h-10 flex items-center justify-center rounded-full bg-purple-300"
            onClick={() => {
              setDoctorToDelete(item);
              setShowModal(true);
            }}
          >
            <Trash2 size={28} strokeWidth={3} color="white" />
          </Button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white shadow-xl p-4 rounded-md flex-1 mt-0 relative min-h-screen flex flex-col">
      {/* TOP */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="hidden md:block text-lg font-semibold text-primary">
          Quản lý bác sĩ
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div className="flex items-center gap-4 self-end">
          <Link href="/test-doctor/add-doctor">
            <Button className="flex items-center justify-center rounded-full bg-gradient-to-r from-blue-300 to-cyan-300 text-white">
              Thêm Bác Sĩ
            </Button>
          </Link>
          <Button
            className="flex items-center justify-center rounded-full bg-gradient-to-r from-blue-300 to-cyan-300 text-white"
            onClick={() => setShowFilter(!showFilter)}
          >
            <SlidersHorizontal className="w-4 h-4" />
          </Button>
          <Button
            className="flex items-center justify-center rounded-full bg-gradient-to-r from-blue-300 to-cyan-300 text-white"
            onClick={() => setShowSort(!showSort)}
          >
            <ArrowDownNarrowWide className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Filter Menu */}
      {showFilter && (
        <div
          className="absolute right-0 mt-4 w-60 p-4 border rounded-lg shadow-lg bg-white border-slate-200 overflow-y-auto"
          style={{ maxHeight: '300px', zIndex: 10 }}
        >
          <h3 className="font-semibold text-primary">Lọc theo chuyên khoa:</h3>
          <div className="flex flex-col mt-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedFaculties.length === 0}
                onChange={() => {
                  if (selectedFaculties.length === 0) {
                    setSelectedFaculties([]);
                  } else {
                    setSelectedFaculties(facultyData.map((f) => f.id));
                  }
                }}
                className="mr-2"
              />
              Tất cả
            </label>
            {facultyData.map((faculty) => (
              <label key={faculty.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedFaculties.includes(faculty.id)}
                  onChange={() => handleFacultyFilterChange(faculty.id)}
                  className="mr-2"
                />
                {faculty.name}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Sort Menu */}
      {showSort && (
        <div
          className="absolute right-0 mt-4 w-60 p-4 border rounded-lg shadow-lg bg-white border-slate-200"
          style={{ maxHeight: '300px', zIndex: 10 }}
        >
          <h3 className="font-semibold text-primary">Sắp xếp:</h3>
          <div className="flex flex-col mt-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="sortOption"
                value="A-Z"
                checked={sortOption === 'A-Z'}
                onChange={() => handleSortOptionChange('A-Z')}
                className="mr-2"
              />
              Tên (A-Z)
            </label>
            <label className="flex items-center mt-2">
              <input
                type="radio"
                name="sortOption"
                value="Z-A"
                checked={sortOption === 'Z-A'}
                onChange={() => handleSortOptionChange('Z-A')}
                className="mr-2"
              />
              Tên (Z-A)
            </label>
          </div>
        </div>
      )}
      {/* LIST */}
      <div className="flex-1 overflow-x-auto w-full">
        <Table columns={columns} data={dataWithIndex} renderRow={renderRow} />
      </div>

      {/* Pagination - Thêm các class mới */}
      <div className="mt-auto pt-4">
        <div className="justify-center items-center gap-2">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Modal Confirm Delete */}
      {showModal && (
        <ModalDelete
          showModal={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={confirmDelete}
          label={`bác sĩ ${doctorToDelete?.name}`}
        />
      )}

      {/* Message */}
      {!fadeOut && message && (
        <div className="absolute top-4 right-4 p-4 bg-green-100 text-green-800 rounded shadow-md">
          {message}
        </div>
      )}
    </div>
  );
};

export default ListDoctor;
