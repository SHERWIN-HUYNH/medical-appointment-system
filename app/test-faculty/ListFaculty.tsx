"use client";
import ModalDelete from "@/components/ModalDelete";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { Button } from "@/components/ui/button";
import { facultyData as initialFacultyData } from "@/lib/data";
import {
  ArrowDownNarrowWide,
  Pencil,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

type Faculty = {
  id: number;
  name: string;
  description: string;
};

const columns = [
  { header: "ID", accessor: "id", className: "hidden lg:table-cell " },
  { header: "Chuyên khoa", accessor: "name" },
  { header: "Mô tả", accessor: "description", className: "hidden md:table-cell " },
];

const ListFaculty = () => {
  const [facultyData, setFacultyData] = useState<Faculty[]>(initialFacultyData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [showModal, setShowModal] = useState(false);
  const [facultyToDelete, setFacultyToDelete] = useState<Faculty | null>(null);
  const [message, setMessage] = useState("");
  const [fadeOut, setFadeOut] = useState(false);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setFadeOut(false);
    setTimeout(() => {
      setFadeOut(true);
    }, 2000);
  };

  const confirmDelete = () => {
    if (facultyToDelete) {
      const updatedFacultyData = facultyData.filter(
        (faculty) => faculty.id !== facultyToDelete.id
      );
      setFacultyData(updatedFacultyData);
      setFacultyToDelete(null);
      setShowModal(false);
      showMessage(`Chuyên khoa ${facultyToDelete.name} đã xóa thành công!`);
    }
  };

  // Tính tổng số trang dựa trên dữ liệu
  const totalPages = Math.ceil(facultyData.length / itemsPerPage);

  // In dữ liệu dựa trên tổng số trang
  const displayedData = facultyData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderRow = (item: Faculty) => (
    <tr
      key={item.id}
      className="h-15 border-b border-slate-200 even:bg-slate-50 text-sm hover:bg-blue-50"
    >
      <td>
        <div className="flex flex-col items-center p-2">
          <h3 className="font-semi">{item.id}</h3>
        </div>
      </td>
      <td className="text-center">{item.name}</td>
      <td className="hidden md:table-cell text-center">{item.description}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/test-faculty/${item.id}/edit-faculty`}>
            <Button className="w-12 h-10 flex items-center justify-center rounded-full bg-blue-300">
              <Pencil size={28} strokeWidth={3} color="white" />
            </Button>
          </Link>
          <Button
            className="w-12 h-10 flex items-center justify-center rounded-full bg-purple-300"
            onClick={() => {
              setFacultyToDelete(item);
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
          Quản lý chuyên khoa
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
        </div>
        <div className="flex items-center gap-4 self-end">
          <Link href="/test-faculty/add-faculty">
            <Button className="flex items-center justify-center rounded-full bg-gradient-to-r from-blue-300 to-cyan-300 text-white">
              Thêm Chuyên Khoa
            </Button>
          </Link>
          <Button
            className="flex items-center justify-center rounded-full bg-gradient-to-r from-blue-300 to-cyan-300 text-white"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </Button>
          <Button className="flex items-center justify-center rounded-full bg-gradient-to-r from-blue-300 to-cyan-300 text-white">
            <ArrowDownNarrowWide className="w-4 h-4" />
          </Button>
        </div>
      </div>

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
          label={`chuyên khoa ${facultyToDelete?.name}`}
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

export default ListFaculty;
