'use client';
import Footer from '@/app/homepage/Footer';
import Header from '@/app/homepage/Header';
import React from 'react';

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="bg-[#e8f2f7] w-full h-min flex flex-col items-center justify-center mt-16 overflow-y-hidden">
        <Header />
        <div className="">
          <main>
            <div className="body-width">{children}</div>
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default UserLayout;
