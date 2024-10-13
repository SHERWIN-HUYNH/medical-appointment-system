"use client";
import Payment from "@/app/payment/page";
import { Button } from "@/components/ui/button";
import { Eraser, UserRoundPlus } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Header from "@/app/homepage/Header";
import Footer from "@/app/homepage/Footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Add_Profile = () => {
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { data: session } = useSession();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "identificationNumber" && isValidIdentificationNumber(value)) {
      setErrorMessage("");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setFormData({
        ...formData,
        identificationDocumentUrl: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setSelectedFile(null);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const isValidIdentificationNumber = (identificationNumber: string) => {
    const idPattern = /^[0-9]{9,12}$/;
    return idPattern.test(identificationNumber);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidIdentificationNumber(formData.identificationNumber)) {
      setErrorMessage("Số giấy định danh không hợp lệ. Vui lòng kiểm tra lại.");
      return;
    }

    // CALL API
    const response = await fetch(`/api/profile/${session?.user?.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "create",
        profile: formData,
      }),
    });

    if (response.ok) {
      const data = await response.json(); 
      setSuccessMessage("Thêm hồ sơ thành công!");
      handleReset();
    } else {
      const errorText = await response.text(); 
      setErrorMessage(errorText || "Thêm hồ sơ thất bại, vui lòng thử lại.");
    }
  };

  return (
    <div>
      <Header />
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
            className="mt-4 grid grid-cols-1 gap-1 lg:grid-cols-2 lg:gap-2 text-sm"
            onSubmit={handleSubmit}
          >
            <div className="rounded-lg bg-slate-100 p-1">
              <Label className="block mb-1 text-left">Họ và tên</Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-1 border border-slate-300 rounded text-sm"
                style={{ height: "30px", fontSize: "14px" }}
                placeholder="Nhập họ và tên"
              />
            </div>

            <div className="rounded-lg bg-slate-100 p-1">
              <Label className="block mb-1 text-left">Ngày sinh</Label>
              <Input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                required
                className="w-full p-1 border border-slate-300 rounded text-sm"
                style={{ height: "30px", fontSize: "14px" }}
              />
            </div>

            <div className="rounded-lg bg-slate-100 p-1">
              <Label className="block mb-1 text-left">Email</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-1 border border-slate-300 rounded text-sm"
                style={{ height: "30px", fontSize: "14px" }}
                placeholder="Nhập email"
              />
            </div>

            <div className="rounded-lg bg-slate-100 p-1">
              <Label className="block mb-1 text-left">Số điện thoại</Label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-1 border border-slate-300 rounded text-sm"
                style={{ height: "30px", fontSize: "14px" }}
                placeholder="Nhập số điện thoại"
              />
            </div>
            <div className="rounded-lg bg-slate-100 p-1">
              <Label className="block mb-1 text-left">Giới tính</Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, gender: value })
                }
                required
              >
                <SelectTrigger
                  className="w-full p-1 border-slate-300 bg-white rounded text-sm"
                  style={{ height: "30px", fontSize: "14px" }}
                >
                  <SelectValue placeholder="Chọn giới tính" />
                </SelectTrigger>
                <SelectContent className="bg-white border-white">
                  <SelectItem className="hover:text-primary" value="MALE">
                    Nam
                  </SelectItem>
                  <SelectItem className="hover:text-primary" value="FEMALE">
                    Nữ
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-lg bg-slate-100 p-1">
              <Label className="block mb-1 text-left">
                Loại giấy định danh
              </Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, identificationType: value })
                }
                required
              >
                <SelectTrigger
                  className="w-full p-1 border border-slate-300 bg-white rounded text-sm"
                  style={{ height: "30px", fontSize: "14px" }}
                >
                  <SelectValue placeholder="Chọn loại giấy" />
                </SelectTrigger>
                <SelectContent className="bg-white border-white">
                  <SelectItem className="hover:text-primary" value="CCCD">
                    Căn cước công dân
                  </SelectItem>
                  <SelectItem className="hover:text-primary" value="CMND">
                    Chứng minh nhân dân
                  </SelectItem>
                  <SelectItem className="hover:text-primary" value="PASSPORT">
                    Hộ chiếu
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-lg bg-slate-100 p-1">
              <Label className="block mb-1 text-left">Số giấy định danh</Label>
              <Input
                type="text"
                name="identificationNumber"
                value={formData.identificationNumber}
                onChange={handleChange}
                required
                className="w-full p-1 border border-slate-300 rounded text-sm"
                style={{ height: "30px", fontSize: "14px" }}
                placeholder="Nhập số giấy định danh"
              />
              {errorMessage && (
                <p className="text-red-500 text-xs mt-1 text-left">
                  {errorMessage}
                </p>
              )}
            </div>

            <div className="rounded-lg bg-slate-100 p-1">
              <Label className="block mb-1 text-left">Lịch sử bệnh án</Label>
              <Textarea
                name="pastMedicalHistory"
                value={formData.pastMedicalHistory}
                onChange={handleChange}
                className="w-full p-1 border border-slate-300 rounded text-sm"
                style={{ height: "100px", fontSize: "14px" }}
                placeholder="Nhập lịch sử bệnh án"
              />
            </div>

            <div className="rounded-lg w-full bg-slate-100 p-1 lg:col-span-2">
              <Label className="block mb-1 text-left">Đường dẫn giấy tờ</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-1 border border-slate-300 rounded text-sm bg-white"
                style={{ height: "30px", fontSize: "14px" }}
              />
              {selectedFile && (
                <div className="mt-2">
                  <Image
                    src={URL.createObjectURL(selectedFile)}
                    alt="Document Preview"
                    className="w-full object-contain"
                    width={100}
                    height={100}
                  />
                </div>
              )}
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
          {successMessage && (
            <div className="mt-50 flex ">
              <div className="text-green-500 font-bold">{successMessage}</div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Add_Profile;
