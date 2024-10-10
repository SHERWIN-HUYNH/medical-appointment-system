"use client";
import { Button } from "@/components/ui/button";
import { profile } from "console";
import { Eraser, UserRoundPlus } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const Add_Profile =  () => {
  const initialFormData = {
    name: "",
    email: "",
    phone: "",
    gender: "",
    identificationType: "",
    identificationNumber: "",
    identificationDocumentUrl: "",
    pastMedicalHistory: "",
    birthDate: "", 
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState("");
  const { data: session } = useSession();
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Kiểm tra tính hợp lệ của số giấy định danh khi người dùng nhập
    if (name === "idNumber" && isValidIdNumber(value)) {
      setErrorMessage(""); // Xóa thông báo lỗi nếu số giấy định danh hợp lệ
    }
  };

  const handleReset = () => {
    setFormData(initialFormData); // Đặt lại giá trị về trạng thái ban đầu
    setErrorMessage(""); // Xóa thông báo lỗi
  };

  const isValidIdNumber = (identificationNumber: string) => {
    const idPattern = /^[0-9]{9,12}$/; 
    return idPattern.test(identificationNumber);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    if (!isValidIdNumber(formData.identificationNumber)) {
      setErrorMessage("Số giấy định danh không hợp lệ. Vui lòng kiểm tra lại.");
    }
    // CALL API
    if(formData){
      const response = await fetch(`/api/profile/${session?.user?.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action:"create",
          profile:formData
        }),
      });
      console.log(response);
    }
    
 
    
    setErrorMessage(""); 
  };

  return (
    <div className="mt-[80px] h-max mb-10">
      <div className="w-2/3 mx-auto h-max rounded-lg bg-slate-100 p-6 lg:col-span-2 text-center">
        <h1 className="text-lg mb-4">TẠO HỒ SƠ KHÁM BỆNH</h1>
        <hr className="w-2/3 mx-auto mt-10 border-slate-400 mb-4" />
        <h3 className="mt-4 font-bold">NHẬP THÔNG TIN BỆNH NHÂN</h3>
        <div className="mt-4 p-4 border border-blue-400 bg-blue-50 rounded-md text-left text-sm">
          <p>
            Vui lòng cung cấp thông tin chính xác để được phục vụ tốt nhất.
            Trong trường hợp cung cấp sai thông tin bệnh nhân & số điện thoại,
            việc xác nhận cuộc hẹn sẽ không hiệu lực trước khi đặt khám.
          </p>
        </div>

        <form
          className="mt-6 grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4 text-sm"
          onSubmit={handleSubmit}
        >
          {/* Họ và tên */}
          <div className="rounded-lg bg-slate-100 p-2">
            <label className="block mb-1 text-left">Họ và tên</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-1 border border-slate-300 rounded text-sm"
              placeholder="Nhập họ và tên"
            />
          </div>

          {/* Ngày sinh */}
          <div className="rounded-lg bg-slate-100 p-2">
            <label className="block mb-1 text-left">Ngày sinh</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
              className="w-full p-1 border border-slate-300 rounded text-sm"
            />
          </div>

          {/* Email */}
          <div className="rounded-lg bg-slate-100 p-2">
            <label className="block mb-1 text-left">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-1 border border-slate-300  rounded text-sm"
              placeholder="Nhập email"
            />
          </div>

          {/* Số điện thoại */}
          <div className="rounded-lg bg-slate-100 p-2">
            <label className="block mb-1 text-left">Số điện thoại</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-1 border border-slate-300 rounded text-sm"
              placeholder="Nhập số điện thoại"
            />
          </div>

          {/* Giới tính */}
          <div className="rounded-lg bg-slate-100 p-2">
            <label className="block mb-1 text-left">Giới tính</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full p-1 border border-slate-300 rounded text-sm"
            >
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </select>
          </div>

          {/* Loại giấy định danh */}
          <div className="rounded-lg bg-slate-100 p-2">
            <label className="block mb-1 text-left">Loại giấy định danh</label>
            <select
              name="idType"
              value={formData.identificationType}
              onChange={handleChange}
              required
              className="w-full p-1 border border-slate-300 rounded text-sm"
            >
              <option value="cccd">Căn cước công dân</option>
              <option value="cmnd">Chứng minh nhân dân</option>
              <option value="passport">Hộ chiếu</option>
            </select>
          </div>

          {/* Số giấy định danh */}
          <div className="rounded-lg bg-slate-100 p-2">
            <label className="block mb-1 text-left">Số giấy định danh</label>
            <input
              type="text"
              name="idNumber"
              value={formData.identificationNumber}
              onChange={handleChange}
              required
              className="w-full p-1 border border-slate-300 rounded text-sm"
              placeholder="Nhập số giấy định danh"
            />
            {errorMessage && (
              <p className="text-red-500 text-xs mt-1 text-left">{errorMessage}</p>
            )}
          </div>

          {/* Đường dẫn giấy tờ */}
          <div className="rounded-lg bg-slate-100 p-2">
            <label className="block mb-1 text-left">Đường dẫn giấy tờ</label>
            <input
              type="text"
              name="documentLink"
              value={formData.identificationDocumentUrl}
              onChange={handleChange}
              className="w-full p-1 border border-slate-300 rounded text-sm"
              placeholder="Nhập đường dẫn"
            />
          </div>

          {/* Lịch sử bệnh án */}
          <div className="rounded-lg bg-slate-100 p-2 lg:col-span-2">
            <label className="block mb-1 text-left">Lịch sử bệnh án</label>
            <textarea
              name="pastMedicalHistory"
              value={formData.pastMedicalHistory}
              onChange={handleChange}
              className="w-full p-1 border border-slate-300 rounded text-sm"
              placeholder="Nhập lịch sử bệnh án"
            />
          </div>

          <div className="lg:col-span-2 text-right">
            <Button
              type="submit"
              className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-300 mr-2"
            >
              <UserRoundPlus className="w-4 h-4 inline mr-1" />
              Tạo hồ sơ
            </Button>
            <Button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-400"
            >
              <Eraser className="w-4 h-4 inline mr-1" />
              Nhập lại
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add_Profile;
