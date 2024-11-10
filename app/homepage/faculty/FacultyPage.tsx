'use client';
import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Image from 'next/image';

interface Faculty {
  id: string;
  name: string;
  image: string;
  description: string;
}

const FacultyPage = () => {
  const [facultyData, setFacultyData] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await fetch('/api/faculty');
        if (response.ok) {
          const data = await response.json();
          setFacultyData(data);
          setLoading(false);
        } else {
          setError('Không thể tải dữ liệu chuyên khoa');
          setLoading(false);
        }
      } catch (error) {
        setError('Đã có lỗi xảy ra');
        setLoading(false);
      }
    };

    fetchFaculties();
  }, []);

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-24">
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-400"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {facultyData.length === 0 ? (
              <div className="text-center text-gray-500">
                Không có dữ liệu chuyên khoa
              </div>
            ) : (
              facultyData.map((faculty) => (
                <a
                  key={faculty.id}
                  href={`/faculty/${faculty.id}`}
                  className="block w-full bg-white hover:bg-blue-50 transition-colors rounded-lg border border-slate-200 shadow-md p-4"
                >
                  <div className="flex items-center w-full">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={`/assets/icons/${faculty.image}`}
                        alt={faculty.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 80px) 100vw, 80px"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <h3 className="text-base font-semibold text-blue-800 mb-0.5 uppercase">
                        {faculty.name}
                      </h3>
                      <span className="text-sm hover:text-red-800 ease-in-out duration-300">
                        Xem chi tiết
                      </span>
                    </div>
                  </div>
                </a>
              ))
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default FacultyPage;
