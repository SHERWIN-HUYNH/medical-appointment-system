"use client";
import React, { useState } from "react";
import { RiEmpathizeFill, RiMoneyDollarCircleLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { FaBookMedical, FaNewspaper } from "react-icons/fa";

const Profile = () => {
  const [selectedOption, setSelectedOption] = useState(1);

  const Buttons = [
    {
      id: 1,
      name: "Hồ sơ bệnh nhân",
      icon: <FaBookMedical />,
    },
    {
      id: 2,
      name: "Phiếu khám bệnh",
      icon: <FaNewspaper />,
    },
    {
      id: 3,
      name: "Lịch sử thanh toán viện phí",
      icon: <RiMoneyDollarCircleLine />,
    },
  ];

  return (
    <div className="mt-[50px] flex justify-start p-10">
      <div className="grid grid-cols-4 gap-12 lg:grid-cols-3 lg:gap-16 p-4 ">
        <div className="rounded-lg flex flex-col items-center ml-30 p-4 w-80">
          <Button className="justify-start border-slate-300 bg-white w-full gap-2 items-center p-3 rounded-lg border-2">
            <RiEmpathizeFill className="text-blue-400" />
            Thêm hồ sơ khám bệnh
          </Button>
          <hr className="w-full border-t-2 border-blue-300 mt-4" />
          <ul className="mt-4 w-full">
            {Buttons.map((item) => (
              <li key={item.id} className="mt-2 w-full">
                <Button
                  className="w-full gap-2 flex items-center justify-start p-3 bg-white "
                  onClick={() => setSelectedOption(item.id)}
                >
                  <span>{item.icon}</span>
                  {item.name}
                </Button>
              </li>
            ))}
          </ul>
        </div>

        <div className="ml-9 rounded-lg lg:col-span-2 p-3 bg-white">
          {selectedOption === 1 && (
            <div>
              <p className="text-slate-300 text-xs">PATIENT'S RECORDS</p>
              <h2 className="text-lg font-bold">Danh sách hồ sơ bệnh nhân</h2>
              <hr className="w-full border-t-2 border-blue-300 mt-4" />
              <br />
              <p>Hiển thị danh sách hồ sơ bệnh nhân tại đây...</p>
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
