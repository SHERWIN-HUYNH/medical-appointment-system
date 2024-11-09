'use client';
import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Icon } from '@iconify/react';

interface Faculty {
  id: string;
  name: string;
  image: string;
  description: string;
}

const FacultyPage = () => {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFaculties = async () => {
      const response = await fetch('/api/faculty');
      const result = await response.json();

      if (result.success && Array.isArray(result.data)) {
        setFaculties(result.data);
      } else {
        setError(result.message || 'Không thể tải dữ liệu chuyên khoa');
      }
      setLoading(false);
    };

    fetchFaculties();
  }, []);

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-24">
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {faculties.length === 0 ? (
              <div className="text-center text-gray-500">
                Không có dữ liệu chuyên khoa
              </div>
            ) : (
              faculties.map((faculty) => (
                <a
                  key={faculty.id}
                  href={`/faculty/${faculty.id}`}
                  className="block w-full bg-white hover:bg-blue-50 transition-colors rounded-lg border border-gray-200"
                >
                  <div className="flex items-center w-full">
                    <div className="w-20 h-20 bg-gradient-to-r from-[#00b5f1] to-[#00e0ff] rounded-lg flex items-center justify-center shrink-0">
                      <Icon
                        icon={faculty.image || 'medical-icon:default'}
                        className="w-8 h-8 text-white"
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
