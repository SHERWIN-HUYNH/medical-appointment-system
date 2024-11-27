'use client'
import React from 'react'
import Header from '../homepage/Header'
import Footer from '../homepage/Footer'

interface FacultyLayoutProps {
  children: React.ReactNode
}

const FacultyLayout = ({ children }: FacultyLayoutProps) => {
  return (
    <div>
      <div className="bg-[#e8f2f7] w-full h-min flex flex-col mt-16">
        <Header />
        <div className="w-full">
          <main className="flex justify-center">{children}</main>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default FacultyLayout
