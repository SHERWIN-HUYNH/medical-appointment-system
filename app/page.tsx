import React from "react";
import Hero from "@/components/Frontend/Hero";
import Brands from "@/components/Frontend/Brands";
import TabbedSection from "@/components/Frontend/TabbedSection";
import DoctorsList from "@/components/DoctorsList";

export default function Home() {
  return (
    <section className="">
      <Hero />
      <Brands />
      <TabbedSection />
      <DoctorsList />
      <DoctorsList
        className="bg-slate-50 py-8 lg:py-24"
        title="In-person doctor visit"
        isInPerson={true}
      />
    </section>
  );
}
