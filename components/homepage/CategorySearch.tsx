"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Brain, Ear, Search } from "lucide-react";
import { FaEye, FaHeartbeat, FaTooth } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { GiBrain, GiBrokenBone } from "react-icons/gi";

// Định nghĩa type Category
type Category = {
  name: string;
  icon: JSX.Element;
};

function CategorySearch() {
  // Danh sách các category với type Category
  const categoryList: Category[] = [
    {
      name: "Dentist",
      icon: <FaTooth className="text-teal-600 h-6 w-6 " />,
    },
    {
      name: "Cardiologist",
      icon: <FaHeartbeat className="text-teal-600 h-6 w-6" />,
    },
    {
      name: "Orthopedic",
      icon: <GiBrokenBone className="text-teal-600 h-6 w-6" />,
    },
    {
      name: "Neologist",
      icon: <Brain className="text-teal-600 h-6 w-6" />,
    },
    {
      name: "Otology",
      icon: <Ear className="text-teal-600 h-6 w-6" />,
    },
    {
      name: "General Doctor",
      icon: <FaUserDoctor className="text-teal-600 h-6 w-6" />,
    },
    {
      name: "Surgeon",
      icon: <FaUserDoctor className="text-teal-600 h-6 w-6" />,
    },
    {
      name: "Psychotropic",
      icon: <GiBrain className="text-teal-600 h-6 w-6" />,
    },
    {
      name: "Eye Specialist",
      icon: <FaEye className="text-teal-600 h-6 w-6" />,
    },
  ];

  // Xử lý button SeeMore
  // State để quản lý hiển thị danh sách category
  const [showAllCategories, setShowAllCategories] = useState<boolean>(false);

  // Hàm để chuyển đổi trạng thái hiển thị các category
  const toggleShowAllCategories = () => {
    setShowAllCategories(!showAllCategories);
  };

  // Hiển thị danh sách các category dựa vào trạng thái showAllCategories
  let displayCategories;
  if (showAllCategories) {
    displayCategories = categoryList;
  } else {
    displayCategories = categoryList.slice(0, 6);
  }

  return (
    <div className="mb-10 items-center px-5 flex flex-col gap-2">
      <h2 className="font-bold text-4xl tracking-wide">
        Search <span className="text-teal-400">Doctors</span>
      </h2>
      <h2 className="text-xl">Search your Doctor and Book Appointment</h2>

      <div className="flex w-full mt-3 max-w-sm items-center space-x-2">
        <Input type="text" placeholder="Search..." />
        <Button className="bg-teal-600 hover:bg-teal-400" type="submit">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
      {/* CategorySearch List */}
      <div className="grid grid-cols-3 mt-5 md:grid-cols-4 lg:grid-cols-6">
        {displayCategories.map((item, index) => (
          <div key={index}>
            <div className="flex flex-col text-center items-center p-5 bg-teal-500 dark:bg-dark-600 m-2 rounded-lg cursor-pointer hover:scale-105 transition-all ease-in-out gap-2">
              <div className="bg-gray-100 p-4 rounded-3xl">{item.icon}</div>
              <p className="text-teal-200 text-sm mt-2">{item.name}</p>
            </div>
          </div>
        ))}
      </div>
      <Button
        className="bg-teal-500 hover:bg-teal-700 mt-3"
        onClick={toggleShowAllCategories}
      >
        {showAllCategories ? "Show Less" : "See More"}
      </Button>
    </div>
  );
}

export default CategorySearch;
