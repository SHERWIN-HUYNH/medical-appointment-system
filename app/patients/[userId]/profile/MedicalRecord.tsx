"use client";
import { Button } from "@/components/ui/button";
import { FilePen, InfoIcon, TrashIcon, X } from "lucide-react";
import React, { useState } from "react";
// Define types for the status and medical record
type Status = {
  id: number;
  label: string;
};

type MedicalRecord = {
  id: string;
  patientName: string;
  department: string;
  time: string;
  hour: string;
  statusId: number;
};

// Array of statuses
const statuses: Status[] = [
  { id: 1, label: "Chưa khám" },
  { id: 2, label: "Đã khám" },
  { id: 3, label: "Đã hủy" },
];

// Array of medical records
const medicalRecordsData: MedicalRecord[] = [
  {
    id: "A2111260001",
    patientName: "NGUYỄN THÚY QUỲNH",
    department: "Chấn thương chỉnh hình",
    time: "29/11/2021",
    hour: "13:00 (Buổi Chiều)",
    statusId: 2, // Đã khám
  },
  {
    id: "A2111260002",
    patientName: "NGÔ THỊ DUYÊN",
    department: "Da Liễu",
    time: "01/12/2021",
    hour: "10:00 (Buổi Sáng)",
    statusId: 1, // Chưa khám
  },
  {
    id: "A2111260003",
    patientName: "HUỲNH CHÍ TRUNG",
    department: "Nội tiết",
    time: "05/12/2021",
    hour: "14:00 (Buổi Chiều)",
    statusId: 3, // Đã hủy
  },
  {
    id: "A2111260004",
    patientName: "NGUYỄN THÚY QUỲNH",
    department: "Tâm lý",
    time: "10/12/2021",
    hour: "10:00 (Buổi Sáng)",
    statusId: 1, // Chưa khám
  },
];

// Modal để in ra chi tiết phiếu khám bệnh
const MedicalRecordDetail = ({
  record,
  onClose,
}: {
  record: MedicalRecord;
  onClose: () => void;
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-full max-w-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Chi tiết hồ sơ</h2>
        <button onClick={onClose}>
          <X className="w-6 h-6 text-gray-500" />
        </button>
      </div>
      <div className="mt-4 space-y-3">
        <div className="flex justify-between">
          <span className="font-semibold">Họ và tên:</span>
          <span>{record.patientName}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Chuyên khoa:</span>
          <span>{record.department}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Thời gian khám:</span>
          <span>{record.time}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Giờ khám:</span>
          <span>{record.hour}</span>
        </div>
      </div>
    </div>
  </div>
);

// Modal for confirmation of cancellation
const ConfirmationModal = ({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-full max-w-sm">
      <h2 className="text-lg font-bold">Xác nhận hủy phiếu khám</h2>
      <p className="mt-4">Bạn có muốn hủy phiếu khám này không?</p>
      <div className="mt-4 flex justify-end gap-2">
        <Button onClick={onCancel} className="bg-gray-300 text-black">
          Hủy
        </Button>
        <Button onClick={onConfirm} className="bg-red-500 text-white">
          Xác nhận
        </Button>
      </div>
    </div>
  </div>
);

const MedicalRecord = () => {
  const [selectedStatusId, setSelectedStatusId] = useState<number>(1);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(
    null
  );
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [recordToCancel, setRecordToCancel] = useState<MedicalRecord | null>(
    null
  );

  // Filter medical records based on selected status
  const filteredRecords = medicalRecordsData.filter(
    (record) => record.statusId === selectedStatusId
  );

  const handleCancelRecord = (record: MedicalRecord) => {
    setRecordToCancel(record);
    setShowConfirmation(true);
  };

  const confirmCancelRecord = () => {
    if (recordToCancel) {
      // Update the status of the record to "Đã hủy" (3)
      recordToCancel.statusId = 3;
      setShowConfirmation(false);
      setSelectedRecord(null);
      alert("Phiếu khám đã được hủy."); // Display confirmation message
    }
  };
  return (
    <div>
      <div className="flex gap-5 ">
        {statuses.map((status) => (
          <Button
            key={status.id}
            className={`button hover:bg-slate-300 ${
              selectedStatusId === status.id ? "button-selected" : ""
            }`}
            onClick={() => setSelectedStatusId(status.id)}
          >
            {status.label}
          </Button>
        ))}
      </div>
      <div className="mt-5 ">
        {filteredRecords.length > 0 ? (
          filteredRecords.map((record) => (
            <div
              key={record.id}
              className="p-4 border-slate-500 rounded-lg shadow-lg bg-white mb-4 flex flex-col gap-4"
            >
              <div className="flex justify-between items-center">
                <p className="text-slate-500">
                  Mã phiếu:{" "}
                  <span className="text-lg font-semibold">{record.id}</span>
                </p>
                <span
                  className={`px-4 py-1 rounded-full text-sm ${
                    record.statusId === 1
                      ? "bg-red-100 text-red-600"
                      : record.statusId === 2
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {
                    statuses.find((status) => status.id === record.statusId)
                      ?.label
                  }
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-bold text-xl">{record.patientName}</p>
                <hr className="border-t border-dashed border-gray-300 w-full my-2" />
                <div className="flex flex-1 gap-6 font-semi text-slate-700 my-1">
                  <span>Chuyên Khoa:</span>
                  <p>{record.department}</p>
                </div>
                <div className="flex flex-1 gap-4 font-semi text-slate-700 my-1">
                  <span>Thời gan khám:</span>
                  <p>{record.time}</p>
                </div>
                <div className="flex flex-1 gap-14 font-semi text-slate-700 my-1">
                  <span>Giờ khám:</span>
                  <p>{record.hour}</p>
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-2">
                {record.statusId === 1 && (
                  <Button
                    className="text-red-500 flex items-center bg-white hover:bg-slate-50"
                    onClick={() => handleCancelRecord(record)}
                  >
                    <TrashIcon className="mr-1" /> Hủy phiếu khám
                  </Button>
                )}
                {record.statusId === 2 && (
                  <Button
                    className="text-yellow-500 flex items-center bg-white hover:bg-slate-50"
                    onClick={() => handleCancelRecord(record)}
                  >
                    <FilePen className="mr-1" /> Đánh giá
                  </Button>
                )}
                <Button
                  className="text-gray-600 flex items-center bg-white hover:bg-slate-50"
                  onClick={() => setSelectedRecord(record)}
                >
                  <InfoIcon className="mr-1" /> Chi tiết
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p>Bạn không có phiếu khám nào trong trạng thái này.</p>
        )}
      </div>
      {/* Display the modal if a record is selected */}
      {selectedRecord && (
        <MedicalRecordDetail
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
        />
      )}
      {showConfirmation && (
        <ConfirmationModal
          onConfirm={confirmCancelRecord}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
};

export default MedicalRecord;
