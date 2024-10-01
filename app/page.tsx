"use client";
import Hero from "@/app/homepage/Hero";
import CategorySearch from "@/app/homepage/CategorySearch";
import DoctorList from "@/app/homepage/DoctorList";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <CategorySearch />
      <DoctorList />
    </div>
  );
}
