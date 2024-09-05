import React from "react";
import SectionHeading from "./SectionHeading";
import ToggleButton from "./ToggleButton";
import Link from "next/link";
import DoctorCard from "./DoctorCard";
import { Map } from "lucide-react";

export default function DoctorsList({
  title = "Telehealth visit",
  isInPerson,
  className = "bg-slate-200 py-8 lg:py-24",
}: {
  title?: string;
  isInPerson?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="max-w-6xl mx-auto">
        <SectionHeading title={title} />
        <div className="py-4 flex items-center justify-between">
          {isInPerson ? (
            <Link href="#" className="text-blue-700 font-semibold">
              <Map />
              <span>Map View</span>
            </Link>
          ) : (
            <ToggleButton />
          )}
          <Link href="#" className="py-2 border border-blue-700 bg-white">
            See All
          </Link>
        </div>
        <div className="py-6">
          <DoctorCard isInPerson={isInPerson} />
        </div>
      </div>
    </div>
  );
}
