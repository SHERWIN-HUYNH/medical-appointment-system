'use client'
import Image from "next/image";
import Link from "next/link";
import { PasskeyModal } from "@/components/PasskeyModal";
import prisma from '../lib/prisma';
import { PatientForm } from "@/components/forms/PatientForm";
import postgres from 'postgres';
import {  DATABASE_URL } from "@/lib/appwrite.config";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

const Home = () => {
  const {data:session} = useSession()
  const [posts, setPosts] = useState();

const fetchPost = async () => {
  const res = await fetch("http://localhost:3000/appointment", {
    method: "GET",
    headers: {
      authorization: `bearer ${session?.user.accessToken}`,
    },
  });

  const response = await res.json();
  setPosts(response);
};
console.log(posts)
  return (
    <div >
      <h1 >HOME PAGE {posts}</h1>
      <button onClick={() => signOut()}>
        Sign out
      </button>
      <button onClick={fetchPost}>
        POST RESPONSE
      </button>

    </div>
  );
};

export default Home;
