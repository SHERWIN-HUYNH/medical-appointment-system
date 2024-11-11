import Hero from '@/app/homepage/Hero';
import CategorySearch from '@/app/homepage/CategorySearch';
import DoctorList from '@/app/homepage/DoctorList';
import Footer from './homepage/Footer';
import Header from './homepage/Header';
import React from 'react';
export default function Home() {
  return (
    <div className="">
      <Header />
      <Hero />
      <CategorySearch />
      <DoctorList />
      <Footer />
    </div>
  );
}
