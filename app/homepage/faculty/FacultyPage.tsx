import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { SquareChartGantt } from 'lucide-react';

interface Faculty {
  id: number;
  name: string;
  image: string;
}

const facultyData: Faculty[] = [
  { id: 1, name: 'CHẨN ĐOÁN HÌNH ẢNH', image: "/images/diagnosis.png" },
  { id: 2, name: 'NHI KHOA', image: '/images/pediatric.png' },
  { id: 3, name: 'TAI - MŨI - HỌNG', image: '/images/ent.png' },
  { id: 4, name: 'HÔ HẤP VÀ DỊ ỨNG MIỄN DỊCH LÂM SÀNG', image: '/images/respiratory.png' },
  { id: 5, name: 'TIÊU HOÁ GAN MẬT', image: '/images/digestive.png'},
  { id: 6, name: 'CƠ - XƯƠNG - KHỚP', image: '/images/orthopedic.png'},
  { id: 7, name: 'SẢN - PHỤ KHOA', image: '/images/obstetrics.png'},
  { id: 8, name: 'TIM MẠCH', image: '/images/cardiology.png'},
  { id: 9, name: 'NỘI SOI', image: '/images/endoscopy.png'},
  { id: 10, name: 'XÉT NGHIỆM', image: '/images/laboratory.png'},
];

const FacultyPage = () => {
  return (
    <div className="flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {facultyData.map((faculty) => (
            <a 
              key={faculty.id}
              href={`/faculty/${faculty.id}`}
              className="flex items-center bg-white rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
                <img 
                  src={faculty.image} 
                  alt={faculty.name}
                  className="w-8 h-8 object-contain invert"
                />
              </div>
              <div className="ml-4 flex flex-col">
                <span className="text-sm font-medium text-gray-800">{faculty.name}</span>
                <span className="text-sm text-blue-600">Xem chi tiết</span>
              </div>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default FacultyPage