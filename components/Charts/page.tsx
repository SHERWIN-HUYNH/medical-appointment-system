'use client';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import ChartOne from '@/components/Charts/ChartOne';
import ChartTwo from '@/components/Charts/ChartTwo';
import dynamic from 'next/dynamic';
import React from 'react';

const ChartThree = dynamic(() => import('@/components/Charts/ChartThree'), {
  ssr: false,
});

const Chart: React.FC = () => {
  const statistics = [
    { specialty: 'Nội khoa', appointments: 120, revenue: '$15,000' },
    { specialty: 'Ngoại khoa', appointments: 90, revenue: '$12,000' },
    { specialty: 'Nhi khoa', appointments: 75, revenue: '$9,000' },
    { specialty: 'Khác', appointments: 50, revenue: '$5,000' },
  ];

  return (
    <>
      <Breadcrumb pageName={[['Thống kê']]} />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-8">
          <div className="h-full bg-white rounded-lg shadow">
            <ChartOne />
          </div>
        </div>
        <div className="col-span-4">
          <div className="h-full bg-white rounded-lg shadow">
            <ChartThree />
          </div>
        </div>

        <div className="col-span-7">
          <ChartTwo />
        </div>

        <div className="col-span-5">
          {/* Bảng thống kê */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider"
                  >
                    Chuyên Khoa
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider"
                  >
                    Số Cuộc Hẹn
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider"
                  >
                    Doanh Thu
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {statistics.map((stat, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {stat.specialty}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {stat.appointments}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {stat.revenue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chart;
