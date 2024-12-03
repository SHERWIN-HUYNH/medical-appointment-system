'use client'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import ChartOne from '@/components/Charts/ChartOne'
import ChartTwo from '@/components/Charts/ChartTwo'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'

interface AppointmentReport {
  facultyId: string
  facultyName: string
  sumAppointmentsFaculty: number
  revenue: number
}

const ChartThree = dynamic(() => import('@/components/Charts/ChartThree'), {
  ssr: false,
})

const Chart: React.FC = () => {
  const [statistics, setStatistics] = useState<AppointmentReport[]>([])

  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const response = await fetch('/api/chart', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('Lỗi khi lấy dữ liệu báo cáo')
        }

        const responseData = await response.json()
        const data: AppointmentReport[] = Array.isArray(responseData) ? responseData : []

        if (data.length === 0) {
          console.warn('Không có dữ liệu để hiển thị.')
          return
        }

        setStatistics(data)
      } catch (error) {
        console.error('Error fetching appointment data:', error)
      }
    }

    fetchAppointmentData()
  }, [])

  return (
    <>
      <Breadcrumb pageName={[['Thống kê', '/admin/chart']]} />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-8">
          <div className="h-full bg-white rounded-lg shadow">
            <ChartOne />
          </div>
        </div>
        <div className="col-span-4 bg-white show  border-stroke shadow-default">
          <div className="h-full  rounded-sm shadow">
            <ChartThree />
          </div>
        </div>

        <div className="col-span-7">
          <ChartTwo />
        </div>

        <div className="col-span-5">
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th
                    scope="col"
                    className="w-2/5 px-3 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider"
                  >
                    Chuyên Khoa
                  </th>
                  <th
                    scope="col"
                    className="w-1/5 px-2 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider"
                  >
                    Số Cuộc Hẹn
                  </th>
                  <th
                    scope="col"
                    className="w-2/5 px-2 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider"
                  >
                    Doanh Thu
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {statistics.map((stat, index) => (
                  <tr key={index}>
                    <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      {stat.facultyName}
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm text-slate-500">
                      {stat.sumAppointmentsFaculty}
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm text-slate-500">
                      {stat.revenue.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chart
