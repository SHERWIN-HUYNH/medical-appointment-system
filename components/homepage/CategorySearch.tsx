'use client';

import React, { useState } from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Brain, Ear, Search } from 'lucide-react';
import {
  FaAllergies,
  FaAppleAlt,
  FaBaby,
  FaChild,
  FaEye,
  FaFlask,
  FaHeartbeat,
  FaLeaf,
  FaRibbon,
  FaStethoscope,
  FaTooth,
  FaVial,
  FaVirus,
  FaWater,
  FaWheelchair,
  FaXRay,
} from 'react-icons/fa';
import { FaUserDoctor } from 'react-icons/fa6';
import { GiBrain, GiBrokenBone, GiMuscleUp } from 'react-icons/gi';

// Định nghĩa type Category
type Category = {
  name: string;
  icon: JSX.Element;
};

function CategorySearch() {
  // Danh sách các category với type Category
  const categoryList: Category[] = [
    {
      name: 'Nha khoa',
      icon: <FaTooth className="text-white h-6 w-6" />,
    },
    {
      name: 'Tim mạch',
      icon: <FaHeartbeat className="text-white h-6 w-6" />,
    },
    {
      name: 'Chỉnh hình',
      icon: <GiBrokenBone className="text-white h-6 w-6" />,
    },
    {
      name: 'Thần kinh',
      icon: <Brain className="text-white h-6 w-6" />,
    },
    {
      name: 'Thính học',
      icon: <Ear className="text-white h-6 w-6" />,
    },
    {
      name: 'Bác sĩ đa khoa',
      icon: <FaUserDoctor className="text-white h-6 w-6" />,
    },
    {
      name: 'Phẫu thuật',
      icon: <FaUserDoctor className="text-white h-6 w-6" />,
    },
    {
      name: 'Tâm thần',
      icon: <GiBrain className="text-white h-6 w-6" />,
    },
    {
      name: 'Chuyên khoa mắt',
      icon: <FaEye className="text-white h-6 w-6" />,
    },
    {
      name: 'Sản khoa',
      icon: <FaBaby className="text-white h-6 w-6" />,
    },
    {
      name: 'Nội tiết',
      icon: <FaFlask className="text-white h-6 w-6" />,
    },
    {
      name: 'Dinh dưỡng',
      icon: <FaAppleAlt className="text-white h-6 w-6" />,
    },
    {
      name: 'Nhi khoa',
      icon: <FaChild className="text-white h-6 w-6" />,
    },
    {
      name: 'Ung bướu',
      icon: <FaRibbon className="text-white h-6 w-6" />,
    },
    {
      name: 'Dị ứng - Miễn dịch',
      icon: <FaAllergies className="text-white h-6 w-6" />,
    },
    {
      name: 'Chẩn đoán hình ảnh',
      icon: <FaXRay className="text-white h-6 w-6" />,
    },
    {
      name: 'Huyết học',
      icon: <FaVial className="text-white h-6 w-6" />,
    },
    {
      name: 'Phục hồi chức năng',
      icon: <FaWheelchair className="text-white h-6 w-6" />,
    },
    {
      name: 'Y học cổ truyền',
      icon: <FaLeaf className="text-white h-6 w-6" />,
    },
    {
      name: 'Nhiễm khuẩn',
      icon: <FaVirus className="text-white h-6 w-6" />,
    },
    {
      name: 'Tiêu hóa',
      icon: <FaStethoscope className="text-white h-6 w-6" />,
    },
    {
      name: 'Thận - Niệu',
      icon: <FaWater className="text-white h-6 w-6" />,
    },
    {
      name: 'Cơ xương khớp',
      icon: <GiMuscleUp className="text-white h-6 w-6" />,
    },
  ];

  // State để quản lý hiển thị danh sách category
  const [showAllCategories, setShowAllCategories] = useState<boolean>(false);

  // Hàm để chuyển đổi trạng thái hiển thị các category
  const toggleShowAllCategories = () => {
    setShowAllCategories(!showAllCategories);
  };

  // Hiển thị danh sách các category dựa vào trạng thái showAllCategories
  let displayCategories;
  if (showAllCategories) {
    displayCategories = categoryList.slice(0, 12);
  } else {
    displayCategories = categoryList.slice(0, 6);
  }

  return (
    <div className="mb-10 items-center px-5 flex flex-col gap-2">
      <h2 className="font-bold text-4xl tracking-wide">
        Tìm kiếm <span className="text-primary">Bác sĩ</span>
      </h2>
      <h2 className="text-xl">Tìm kiếm bác sĩ của bạn vào bắt đầu đặt lịch hẹn</h2>

      <div className="flex w-full mt-3 max-w-sm items-center space-x-2">
        <Input type="text" placeholder="Search..." className="border-slate-400" />
        <Button className="text-white bg-primary hover:bg-[#56c2e6]" type="submit">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
      {/* CategorySearch List */}
      <div className="grid grid-cols-3 mt-5 md:grid-cols-4 lg:grid-cols-6">
        {displayCategories.map((item, index) => (
          <div key={index}>
            <div className="flex flex-col text-center items-center p-5 bg-white border-2 border-slate-400 m-2 rounded-lg cursor-pointer hover:scale-105 transition-all ease-in-out gap-2">
              <div className="p-4 rounded-3xl bg-primary">{item.icon}</div>
              <p className="text-blue-900 text-sm mt-2">{item.name}</p>
            </div>
          </div>
        ))}
      </div>
      <Button
        className="bg-primary hover:bg-[#56c2e6] text-white mt-3"
        onClick={toggleShowAllCategories}
      >
        {showAllCategories ? 'Thu gọn' : 'Xem thêm'}
      </Button>
    </div>
  );
}

export default CategorySearch;
