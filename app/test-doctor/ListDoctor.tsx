"use client";
import ModalDelete from "@/components/ModalDelete";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { Button } from "@/components/ui/button";
import { facultyData } from "@/lib/data";
import { doctorData as initialDoctorData } from "@/lib/data";
import {
  ArrowDownNarrowWide,
  Pencil,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

type Doctor = {
  id: number;
  name: string;
  academicTitle: string;
  facultyId: number;
  isActive: boolean;
  image: string;
  description: string;
};

const columns = [
  { header: "ID", accessor: "id", className: "hidden lg:table-cell " },
  { header: "Bác sĩ", accessor: "doctor" },
  { header: "Học hàm/học vị", accessor: "academicTitle" },
  { header: "Chuyên khoa", accessor: "facultyName" },
  { header: "Hình ảnh", accessor: "imageDoctor" },
  {
    header: "Mô tả",
    accessor: "description",
    className: "hidden md:table-cell ",
  },
];

const ListDoctor = () => {
  const [doctorData, setDoctorData] = useState<Doctor[]>(initialDoctorData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [showModal, setShowModal] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState<Doctor | null>(null);
  const [message, setMessage] = useState("");
  const [fadeOut, setFadeOut] = useState(false);
  const [selectedFaculties, setSelectedFaculties] = useState<number[]>([]);
  const [showFilter, setShowFilter] = useState(false);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setFadeOut(false);
    setTimeout(() => {
      setFadeOut(true);
    }, 2000);
  };

  const confirmDelete = () => {
    if (doctorToDelete) {
      const updatedDoctorData = doctorData.filter(
        (doctor) => doctor.id !== doctorToDelete.id
      );
      setDoctorData(updatedDoctorData);
      setDoctorToDelete(null);
      setShowModal(false);
      // Gọi hàm showMessage sau khi xóa thành công
      showMessage(`Bác sĩ ${doctorToDelete.name} đã xóa thành công!`);
    }
  };

  const handleFacultyFilterChange = (facultyId: number) => {
    if (selectedFaculties.includes(facultyId)) {
      setSelectedFaculties(selectedFaculties.filter((id) => id !== facultyId));
    } else {
      setSelectedFaculties([...selectedFaculties, facultyId]);
    }
    setCurrentPage(1); // Reset trang về một nếu thay đổi bộ lọc
  };

  // Lọc bác sĩ dựa trên id chuyên khoa
  const filteredDoctorData = doctorData.filter((doctor) =>
    selectedFaculties.length === 0
      ? true
      : selectedFaculties.includes(doctor.facultyId)
  );

  // Tính tổng số trang dựa trên dữ liệu đã lọc
  const totalPages = Math.ceil(filteredDoctorData.length / itemsPerPage);

  // In dữ liệu dựa trên tổng số trang và dữ liệu lọc
  const displayedData = filteredDoctorData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getFacultyName = (facultyId: number) => {
    const faculty = facultyData.find((f) => f.id === facultyId);
    return faculty ? faculty.name : "NULL";
  };

  const renderRow = (item: Doctor) => (
    <tr
      key={item.id}
      className="h-15 border-b border-slate-200 even:bg-slate-50 text-sm hover:bg-blue-50"
    >
      <td>
        <div className="flex flex-col items-center p-2">
          <h3 className="font-semi">{item.id}</h3>
        </div>
      </td>
      <td className="hidden md:table-cell text-center">{item.name}</td>
      <td className="hidden md:table-cell text-center">{item.academicTitle}</td>
      <td className="hidden md:table-cell text-center">
        {getFacultyName(item.facultyId)}
      </td>
      <td className="hidden md:table-cell text-center">
        <Image
          src={`/assets/doctor/${item.image}`}
          alt={item.name}
          width={100}
          height={100}
          className="rounded"
        />
      </td>
      <td className="hidden md:table-cell text-center">{item.description}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/test-doctor/${item.id}/schedule`}>
            <Button className="w-auto h-10 flex items-center justify-center rounded-full bg-green-300">
              <span className="text-white font-bold">Xem lịch</span>
            </Button>
          </Link>
          <Link href={`/test-doctor/${item.id}/edit-doctor`}>
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
    <div className="bg-white shadow-xl p-4 rounded-md flex-1 mt-0 relative">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold text-primary">
          Quản lý bác sĩ
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
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
          <Button className="flex items-center justify-center rounded-full bg-gradient-to-r from-blue-300 to-cyan-300 text-white">
            <ArrowDownNarrowWide className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Filter Menu */}
      {showFilter && (
        <div
          className="absolute right-0 mt-4 w-60 p-4 border rounded-lg shadow-lg bg-white border-slate-200 overflow-y-auto"
          style={{ maxHeight: "300px", zIndex: 10 }}
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

      {/* LIST */}
      <div className="overflow-x-auto">
        <Table columns={columns} data={displayedData} renderRow={renderRow} />
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

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
