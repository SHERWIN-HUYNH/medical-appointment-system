import Hero from "@/app/homepage/Hero";
import CategorySearch from "@/app/homepage/CategorySearch";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import DoctorList from "@/app/homepage/DoctorList";

export default function Home() {
  return (
    <div className="">
      {/* Hero Section */}
      <Hero />

      {/* Dự định làm cần database*/}
      {/* Search Bar + Categories */}
      <CategorySearch />

      {/* Popular Doctors */}
      <DoctorList />
    </div>
  );
}
