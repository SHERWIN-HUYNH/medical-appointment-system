'use client'
import Hero from "@/app/homepage/Hero";
import CategorySearch from "@/app/homepage/CategorySearch";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import DoctorList from "@/app/homepage/DoctorList";
import { getSession, useSession } from "next-auth/react";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next"

export default function Home() {
 const {data:session} =  useSession()
 if (session) {
   return <pre>TEST {JSON.stringify(session)}</pre>
  }

  return (
    <div className="">
      <Hero />
      <CategorySearch />
      <DoctorList />
    </div>
  );
}
