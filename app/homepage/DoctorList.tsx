"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../../components/ui/button";

type Doctor = {
  name: string;
  category: string;
  image: string;
  address: string;
  phone: string;
  year_of_experience: string;
};

function DoctorList() {
  const [showAll, setShowAll] = useState(false);

  const doctorList: Doctor[] = [
    {
      name: "Mary",
      category: "Dentist",
      image: "/assets/doctor/dt1.jpg",
      address:
        "425 – 427 – 429 đường Nơ Trang Long, Phường 13, Quận Bình Thạnh",
      phone: "",
      year_of_experience: "20 years",
    },
    {
      name: "Mary",
      category: "Dentist",
      image: "/assets/doctor/dt2.jpg",
      address:
        "425 – 427 – 429 đường Nơ Trang Long, Phường 13, Quận Bình Thạnh",
      phone: "",
      year_of_experience: "20 years",
    },
    {
      name: "Mary",
      category: "Dentist",
      image: "/assets/doctor/dt3.jpg",
      address:
        "425 – 427 – 429 đường Nơ Trang Long, Phường 13, Quận Bình Thạnh",
      phone: "",
      year_of_experience: "20 years",
    },
    {
      name: "Mary",
      category: "Dentist",
      image: "/assets/doctor/dt4.jpg",
      address:
        "425 – 427 – 429 đường Nơ Trang Long, Phường 13, Quận Bình Thạnh",
      phone: "",
      year_of_experience: "20 years",
    },
    {
      name: "Mary",
      category: "Dentist",
      image: "/assets/doctor/dt5.jpg",
      address:
        "425 – 427 – 429 đường Nơ Trang Long, Phường 13, Quận Bình Thạnh",
      phone: "",
      year_of_experience: "20 years",
    },
    {
      name: "Mary",
      category: "Dentist",
      image: "/assets/doctor/dt10.jpg",
      address:
        "425 – 427 – 429 đường Nơ Trang Long, Phường 13, Quận Bình Thạnh",
      phone: "",
      year_of_experience: "20 years",
    },
  ];

  let displayedDoctors;

  if (showAll) {
    // Nếu showAll là true, hiển thị tất cả bác sĩ
    displayedDoctors = doctorList;
  } else {
    // Nếu showAll là false, chỉ hiển thị 4 bác sĩ đầu tiên
    displayedDoctors = doctorList.slice(0, 4);
  }

  return (
    <div className="mb-10 px-8">
      <h2 className="font-bold text-xl">Popular Doctors</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-5">
        {displayedDoctors.map((doctor, index) => (
          <div
            className="border-[1px] rounded-lg p-3 cursor-pointer hover:border-teal-600 hover:shadow-sm hover:scale-105 transition-all ease-in-out"
            key={index}
          >
            <Image
              src={doctor.image}
              alt="doctorImg"
              width={500}
              height={200}
              className="h-[250px] w-full object-cover rounded-lg"
            />
            <div className="mt-3 items-baseline flex flex-col gap-1">
              <h2 className="text-[15px] bg-blue-100 p-1 rounded-full px-2 text-teal-700">
                {doctor.category}
              </h2>
              <h2 className="font-bold">{doctor.name}</h2>
              <h2 className="text-teal-500 text-sm">
                {doctor.year_of_experience}
              </h2>
              <h2 className="text-gray-100 text-sm">{doctor.address}</h2>
              <h2
                className="p-2 px-3 border-[1px] border-teal-400 text-teal-400 rounded-full 
                w-full text-center text-[14px] mt-2 cursor-pointer hover:bg-teal-500 hover:text-white"
              >
                Book Now
              </h2>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-5">
        <Button
          className="bg-teal-500 hover:bg-teal-700"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "See More"}
        </Button>
      </div>
    </div>
  );
}

export default DoctorList;
