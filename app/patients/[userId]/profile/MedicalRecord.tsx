'use client';
import { Button } from '@/components/ui/button';
import { FilePen, InfoIcon, TrashIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ReviewModal from './ReviewModal';

type MedicalRecord = {
  id: string;
  patientName: string;
  faculty: string;
  doctorName: string;
  serviceName: string;
  price: number;
  time: string;
  hour: string;
  status: 'SCHEDULED' | 'PENDING' | 'CANCELLED';
  doctorId: string;
  cancellationReason: string | null;
};

const statuses = [
  { value: 'PENDING', label: 'Đang chờ khám' },
  { value: 'SCHEDULED', label: 'Đã khám' },
  { value: 'CANCELLED', label: 'Đã hủy' },
];

const MedicalRecord = () => {
  const params = useParams();
  const [selectedStatus, setSelectedStatus] = useState<'SCHEDULED' | 'PENDING' | 'CANCELLED'>('SCHEDULED');
  const [appointments, setAppointments] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<MedicalRecord | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`/api/appointments/${params.userId}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [params.userId]);

  const filteredRecords = appointments.filter(
    (record) => record.status === selectedStatus
  );

  const handleReviewClick = (record: MedicalRecord) => {
    setSelectedAppointment(record);
    setShowReviewModal(true);
  };

  const handleSubmitReview = async () => {
    if (rating === 0) {
      alert('Vui lòng chọn số sao đánh giá');
      return;
    }

    if (!selectedAppointment) return;

    try {
      const response = await fetch('/api/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          rating: rating,
          doctorId: selectedAppointment.doctorId,
          userId: params.userId,
        }),
      });

      if (response.ok) {
        alert('Đánh giá thành công!');
        setShowReviewModal(false);
        setSelectedAppointment(null);
        setRating(0);
        setComment('');
      } else {
        throw new Error('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại sau.');
    }
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div>
      <div className="flex gap-3">
        {statuses.map((status) => (
          <Button
            key={status.value}
            className={`text-sm px-4 py-1.5 rounded-full ${
              selectedStatus === status.value 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setSelectedStatus(status.value as 'SCHEDULED' | 'PENDING' | 'CANCELLED')}
          >
            {status.label}
          </Button>
        ))}
      </div>
      <div className="mt-5">
        {filteredRecords.length > 0 ? (
          filteredRecords.map((record) => (
            <div
              key={record.id}
              className="p-4 border-[0.5px] border-slate-50 rounded-lg shadow-[0_2px_8px_rgb(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgb(0,0,0,0.06)] transition-shadow bg-white mb-4"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm font-semibold text-primary">{record.patientName}</div>
                <span
                  className={`px-2 py-0.5 text-xs rounded-full ${
                    record.status === 'PENDING'
                      ? 'bg-yellow-50 text-yellow-600'
                      : record.status === 'SCHEDULED'
                        ? 'bg-green-50 text-green-600'
                        : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {statuses.find((status) => status.value === record.status)?.label}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs mb-3">
                <div className="flex items-center">
                  <span className="text-gray-500 w-16">Khoa:</span>
                  <span>{record.faculty}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 w-16">Dịch vụ:</span>
                  <span>{record.serviceName}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 w-16">Bác sĩ:</span>
                  <span>{record.doctorName}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 w-16">Thời gian:</span>
                  <span>{record.time}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 w-16">Giờ khám:</span>
                  <span>{record.hour}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                {record.status === 'PENDING' && (
                  <Button
                    size="sm"
                    className="text-red-500 text-xs flex items-center bg-transparent"
                  >
                    <TrashIcon className="w-3 h-3 mr-1" /> Hủy lịch hẹn
                  </Button>
                )}
                {record.status === 'SCHEDULED' && (
                  <Button
                    size="sm"
                    className="text-yellow-500 text-xs flex items-center bg-transparent"
                    onClick={() => handleReviewClick(record)}
                  >
                    <FilePen className="w-3 h-3 mr-1" /> Đánh giá
                  </Button>
                )}
                <Button
                  size="sm"
                  className="text-gray-600 text-xs flex items-center bg-transparent"
                >
                  <InfoIcon className="w-3 h-3 mr-1" /> Chi tiết
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p>Bạn không có phiếu khám nào trong trạng thái này.</p>
        )}
      </div>
      
      {showReviewModal && (
        <ReviewModal
          rating={rating}
          setRating={setRating}
          comment={comment}
          setComment={setComment}
          onSubmit={handleSubmitReview}
          onClose={() => {
            setShowReviewModal(false);
            setSelectedAppointment(null);
            setRating(0);
            setComment('');
          }}
        />
      )}
    </div>
  );
};

export default MedicalRecord;
