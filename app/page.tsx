
import CategorySearch from '@/components/homepage/CategorySearch';
import DoctorList from '@/components/homepage/DoctorList';
import Footer from '@/components/homepage/Footer';
import Header from '@/components/homepage/Header';
import Hero from '@/components/homepage/Hero';
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
