"use client";
import ModalDelete from "@/components/ModalDelete";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { Button } from "@/components/ui/button";
import { Trash2, Star as StarSolid } from "lucide-react";
import React, { useState } from "react";

type Evaluate = {
  id: number;
  date: string;
  username: string;
  doctor: string;
  content: string;
  rating: number;
};

const initialEvaluateData: Evaluate[] = [
  { id: 1, date: "2024-10-01", username: "Nguyen Van A", doctor: "Dr. Pham Minh Khoa", content: "Dịch vụ tốt", rating: 5 },
  { id: 2, date: "2024-10-02", username: "Tran Thi B", doctor: "Dr. Le Thi Thanh", content: "Phục vụ chưa tốt", rating: 3 },
  { id: 3, date: "2024-10-03", username: "Le Van C", doctor: "Dr. Nguyen Van Binh", content: "Rất hài lòng", rating: 4 },
  { id: 4, date: "2024-10-04", username: "Pham Thi D", doctor: "Dr. Hoang Van Thanh", content: "Thời gian chờ lâu", rating: 2 },
  { id: 5, date: "2024-10-05", username: "Doan Van E", doctor: "Dr. Tran Van Tam", content: "Sẽ quay lại", rating: 5 },
  { id: 6, date: "2024-10-06", username: "Nguyen Van F", doctor: "Dr. Pham Minh Khoa", content: "Không hài lòng với dịch vụ", rating: 2 },
  { id: 7, date: "2024-10-07", username: "Le Thi G", doctor: "Dr. Hoang Van Thanh", content: "Tốt nhưng có thể cải thiện", rating: 4 },
];

const columns = [
  { header: "Ngày đăng", accessor: "date" },
  { header: "Tên người dùng", accessor: "username" },
  { header: "Bác sĩ", accessor: "doctor" },
  { header: "Nội dung", accessor: "content", className: "hidden md:table-cell " },
  { header: "Số sao đánh giá", accessor: "rating" },
];

const ListEvaluate = () => {
  const [evaluateData, setEvaluateData] = useState<Evaluate[]>(initialEvaluateData);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [searchMessage, setSearchMessage] = useState<string>("");
  const itemsPerPage = 7;
  const [showModal, setShowModal] = useState(false);
  const [evaluateToDelete, setEvaluateToDelete] = useState<Evaluate | null>(null);
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
    if (evaluateToDelete) {
      const updatedEvaluateData = evaluateData.filter(
        (evaluate) => evaluate.id !== evaluateToDelete.id
      );
      setEvaluateData(updatedEvaluateData);
      setEvaluateToDelete(null);
      setShowModal(false);
      showMessage(`Đánh giá từ ${evaluateToDelete.username} đã xóa thành công!`);
    }
  };

  const totalPages = Math.ceil(evaluateData.length / itemsPerPage);

  const filteredData = evaluateData.filter((item) => {
    return (
      (!selectedDoctor || item.doctor === selectedDoctor) &&
      (!selectedRating || item.rating === selectedRating)
    );
  });

  const displayedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (searchTerm: string) => {
    const results = evaluateData.filter((item) =>
      item.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (results.length === 0) {
      setSearchMessage("Không tìm thấy đánh giá phù hợp.");
    } else {
      setSearchMessage("");
    }
    setEvaluateData(results);
    setCurrentPage(1); // Reset về trang đầu tiên khi có kết quả mới
  };

  const renderStars = (rating: number) => (
    <div className="flex justify-center">
      {[...Array(5)].map((_, index) => (
        <StarSolid
          key={index}
          size={20}
          fill={index < rating ? "gold" : "gray"}
          stroke="none"
        />
      ))}
    </div>
  );

  const renderRow = (item: Evaluate) => (
    <tr key={item.id} className="h-15 border-b border-slate-200 even:bg-slate-50 text-sm hover:bg-blue-50">
      <td className="text-center">{item.date}</td>
      <td className="text-center">{item.username}</td>
      <td className="text-center">{item.doctor}</td>
      <td className="hidden md:table-cell text-center">{item.content}</td>
      <td className="text-center">{renderStars(item.rating)}</td>
      <td>
        <div className="flex items-center gap-2">
          <Button
            className="w-12 h-10 flex items-center justify-center rounded-full bg-purple-300"
            onClick={() => {
              setEvaluateToDelete(item);
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
    <div className="bg-white shadow-xl p-4 rounded-md flex-1 mt-0 relative h-screen">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold text-primary">
          Quản lý đánh giá
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
        <TableSearch onSearch={handleSearch} />
          
          <select
            className="p-2 border rounded-xl border-primary"
            value={selectedRating || ""}
            onChange={(e) => setSelectedRating(Number(e.target.value) || null)}
          >
            <option value="">Số sao</option>
            {[5, 4, 3, 2, 1].map((rating) => (
              <option key={rating} value={rating}>
                {rating} sao
              </option>
            ))}
          </select>
        </div>
      </div>

      {searchMessage && (
        <div className="mt-4 text-center text-red-500">{searchMessage}</div>
      )}

      <div className="overflow-x-auto">
        <Table columns={columns} data={displayedData} renderRow={renderRow} />
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      {showModal && (
        <ModalDelete
          showModal={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={confirmDelete}
          label={`đánh giá từ ${evaluateToDelete?.username}`}
        />
      )}

      {!fadeOut && message && (
        <div className="absolute top-4 right-4 p-4 bg-green-100 text-green-800 rounded shadow-md">
          {message}
        </div>
      )}
    </div>
  );
};

export default ListEvaluate;
