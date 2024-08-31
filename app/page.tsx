
import Image from "next/image";
import Link from "next/link";
import { PasskeyModal } from "@/components/PasskeyModal";
import prisma from '../lib/prisma';
import { PatientForm } from "@/components/forms/PatientForm";
import postgres from 'postgres';
import {  DATABASE_URL } from "@/lib/appwrite.config";

const Home =async () => {
  return (
    <div >
      <h1>HOME PAGE </h1>
    </div>
  );
};

export default Home;
