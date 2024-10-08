"use client";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { Button } from "@/components/ui/button";
import { facultyData } from "@/lib/data";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

type Faculty = {
  id: number;
  name: string;
  description: string;
};

const columns = [
  {
    header: "FacultyId",
    accessor: "facultyId",
    className: "hidden md:table-cell ",
  },
  {
    header: "Faculty",
    accessor: "faculty",
  },
  {
    header: "Description",
    accessor: "description",
    className: "hidden md:table-cell ",
  },
  {
    header: "Actions",
    accessor: "actions",
    className: "hidden md:table-cell ",
  },
];
const ListFaculty = () => {
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const itemsPerPage = 5; // Define how many items you want per page
  const totalPages = Math.ceil(facultyData.length / itemsPerPage); // Calculate total pages

  // Slice the data to get only the items for the current page
  const displayedData = facultyData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderRow = (item: Faculty) => {
    return (
      <tr
        key={item.id}
        className="h-15 border-b border-slate-200 even:bg-slate-50 text-sm hover:bg-blue-50"
      >
        <td>
          <div className="flex flex-col items-center">
            <h3 className="font-semi">{item.id}</h3>
          </div>
        </td>
        <td className="hidden md:table-cell">{item.name}</td>
        <td className="hidden md:table-cell">{item.description}</td>
        <td>
          <div className="flex items-center gap-2">
            <Link href={`/test-faculty/${item.id}`}>
              <Button className="w-12 h-10 flex items-center justify-center rounded-full bg-blue-300">
                <Pencil size={28} strokeWidth={3} color="white" />
              </Button>
            </Link>
            <Button className="w-12 h-10 flex items-center justify-center rounded-full bg-purple-300">
              <Trash2 size={28} strokeWidth={3} color="white" />
            </Button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="bg-white shadow-xl p-4 rounded-md flex-1 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Faculty</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
        </div>
        <div className="flex items-center gap-4 self-end">
          <Button className="flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-400 text-white">
            Thêm chuyên khoa
          </Button>
        </div>
      </div>
      {/* LIST */}
      <div className="">
        <Table columns={columns} renderRow={renderRow} data={displayedData} />
      </div>
      {/* PAGINATION */}
      <div className="">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage} // Pass the function to update current page
        />
      </div>
    </div>
  );
};

export default ListFaculty;
