import React from "react";
import { Button } from "@/components/ui/button";;
import { Textarea } from "@/components/ui/textarea";

interface ReviewModalProps {
  rating: number;
  setRating: (rating: number) => void;
  comment: string;
  setComment: (comment: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

const ReviewModal = (props: ReviewModalProps) => {
  const { rating, setRating, comment, setComment, onSubmit, onClose } = props;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl h-auto">
        <h3 className="font-bold text-lg">Đánh giá</h3>
        <div className="flex justify-center gap-2 mt-4">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`cursor-pointer text-3xl ${
                index < rating ? "text-yellow-500" : "text-slate-300"
              }`}
              onClick={() => setRating(index + 1)}
            >
              ★
            </span>
          ))}
        </div>
        <Textarea
          className="mt-4 w-full p-2 rounded h-32 border border-slate-300 focus:ring-0"
          placeholder="Nhập nhận xét của bạn..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="mt-4 flex justify-end gap-2">
          <Button onClick={onClose} className="bg-gray-300 text-black">
            Hủy
          </Button>
          <Button onClick={onSubmit} className="bg-blue-800 hover:bg-blue-700 text-white">
            Gửi đánh giá
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
