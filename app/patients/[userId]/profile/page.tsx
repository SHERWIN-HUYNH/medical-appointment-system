"use client"
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { RiEmpathizeFill, RiMoneyDollarCircleLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { FaBookMedical, FaNewspaper } from "react-icons/fa";
import { MapPinHouse, PencilLine, Smartphone, Trash2, UserRoundPen } from "lucide-react";
import Link from "next/link";

interface Profile {
  id: number; // or string
  name: string;
  phone: string;
  address: string;
}
const Profile = () => {
  const [selectedOption, setSelectedOption] = useState(1);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const { data: session, status } = useSession();

  // Chỉ fetch dữ liệu khi session đã sẵn sàng và có user.id
  useEffect(() => {
    const fetchProfiles = async () => {
      if (status === "authenticated" && session?.user?.id) {
        try {
          const response = await fetch(`/api/profile/${session.user.id}`);
          const data = await response.json();
          setProfiles(data); // Cập nhật state với danh sách hồ sơ
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu hồ sơ:", error);
        }
      }
    };

    fetchProfiles();
  }, [status, session]);

  const Buttons = [
    { id: 1, name: "Hồ sơ bệnh nhân", icon: <FaBookMedical /> },
    { id: 2, name: "Phiếu khám bệnh", icon: <FaNewspaper /> },
    { id: 3, name: "Lịch sử thanh toán viện phí", icon: <RiMoneyDollarCircleLine /> },
  ];

  return (
    <div className="mt-[50px] flex justify-center p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* Left Side (Buttons) */}
        <div className="rounded-lg flex flex-col items-center p-4 w-full lg:w-auto">
          <Link href="/patients/333/profile/add-profile">
            <Button className="justify-start border-slate-300 bg-white hover:bg-sky-200 w-full gap-2 items-center p-3 rounded-lg border-2">
              <RiEmpathizeFill className="text-blue-400" />
              Thêm hồ sơ khám bệnh
            </Button>
          </Link>

          <hr className="w-full border-t-2 border-blue-300 mt-4" />
          <ul className="mt-4 w-full">
            {Buttons.map((item) => (
              <li key={item.id} className="mt-2 w-full">
                <Button
                  className={`w-full gap-2 flex items-center justify-start p-3 hover:bg-sky-200 bg-white ${
                    selectedOption === item.id ? "bg-blue-50" : ""
                  }`}
                  onClick={() => setSelectedOption(item.id)}
                >
                  <span>{item.icon}</span>
                  {item.name}
                </Button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side (Content) */}
        <div className="rounded-lg lg:col-span-2 p-4 bg-white w-full">
          {selectedOption === 1 && (
            <div>
              <p className="text-slate-300 text-xs">PATIENT'S RECORDS</p>
              <h2 className="text-lg font-bold">Danh sách hồ sơ bệnh nhân</h2>
              <hr className="w-full border-t-2 border-blue-300 mt-4" />
              <br />

              {profiles.length > 0 ? (
                profiles.map((profile) => (
                  <div
                    key={profile.id}
                    className="bg-gray-50 p-4 text-sm rounded-lg shadow-md transition-all ease-in-out duration-100 cursor-pointer mb-4"
                  >
                    <div className="max-h grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
                      <div className="max-h rounded-lg bg-gray-200">
                        <p className="text-blue-400 mt-2 text-md flex items-center gap-2">
                          <UserRoundPen className="w-4 h-4" />
                          <span className="uppercase">{profile.name}</span>
                        </p>
                        <br />
                        <p className="mt-2 text-md flex items-center gap-2">
                          <Smartphone className="w-4 h-4" />
                          <span>Số điện thoại</span>
                        </p>
                        <p className="mt-2 text-md flex items-center gap-2">
                          <MapPinHouse className="w-4 h-4" />
                          <span>Địa chỉ</span>
                        </p>
                      </div>
                      <div className="max-h rounded-lg bg-gray-200 lg:col-span-2">
                        <div className="mt-2 flex justify-end">
                          <Button className="bg-white text-green-400 hover:bg-green-400 hover:text-white text-xs">
                            Xem chi tiết
                          </Button>
                        </div>
                        <p className="mt-2">{profile.phone}</p>
                        <p className="mt-2">{profile.address}</p>
                      </div>
                    </div>
                    <hr className="mt-2" />
                    <div className="mt-2 flex flex-1 justify-end gap-2">
                      <div>
                        <Button className="bg-white text-pink-400 hover:bg-pink-400 hover:text-white text-xs">
                          <span>
                            <Trash2 className="w-4 h-4 inline mr-1" />
                          </span>
                          Xóa hồ sơ
                        </Button>
                        <Link href="/patients/333/profile/edit-profile">
                        <Button className="bg-white text-blue-400 hover:bg-blue-400 hover:text-white text-xs">
                          <span>
                            <PencilLine className="w-4 h-4 inline mr-1" />
                          </span>
                          Sửa hồ sơ
                        </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 text-xs">Bạn chưa có hồ sơ bệnh nhân. Vui lòng tạo mới hồ sơ để được đặt khám.</p>
              )}
            </div>
          )}

          {selectedOption === 2 && (
            <div>
              <p className="text-slate-300 text-xs">MEDICAL BILLS</p>
              <h2 className="text-lg font-bold">Danh sách phiếu khám bệnh</h2>
              <hr className="w-full border-t-2 border-blue-300 mt-4" />
              <br />
              <p>Hiển thị thông tin phiếu khám bệnh tại đây...</p>
            </div>
          )}
          {selectedOption === 3 && (
            <div>
              <p className="text-slate-300 text-xs">PAYMENT HISTORY</p>
              <h2 className="text-lg font-bold">Lịch sử thanh toán viện phí</h2>
              <hr className="w-full border-t-2 border-blue-300 mt-4" />
              <br />
              <p>Hiển thị lịch sử thanh toán viện phí tại đây...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
