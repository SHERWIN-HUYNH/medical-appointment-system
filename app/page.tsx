import Hero from "@/components/homepage/Hero";
import CategorySearch from "@/components/homepage/CategorySearch";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import DoctorList from "@/components/homepage/DoctorList";

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
