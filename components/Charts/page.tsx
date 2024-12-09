'use client'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import ChartOne from '@/components/Charts/ChartOne'
import ChartTwo from '@/components/Charts/ChartTwo'
import { AppointmentReport, fetchAppointmentData } from '@/helpers/chart'
import { s } from '@fullcalendar/core/internal-common'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'

interface AppointmentData {
  year: number
  month: number
  price: number
  totalAppointments: number
  totalAmount: number
}
const ChartThree = dynamic(() => import('@/components/Charts/ChartThree'), {
  ssr: false,
})

const Chart: React.FC = () => {
  const [statistics, setStatistics] = useState<AppointmentReport[]>([])
  const [appointmentsData, setAppointmentsData] = useState<AppointmentData[]>([])

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchAppointmentData()
      if (data.length === 0) {
        console.warn('Không có dữ liệu để hiển thị.')
      }
      setStatistics(data)
    }

    loadData()
  }, [])

  useEffect(() => {
    const fetchAppointmentsData = async () => {
      try {
        const response = await fetch(`/api/chart/chart2`)
        const data = await response.json()
        setAppointmentsData(data)
      } catch (error) {
        console.error('Error fetching appointment data:', error)
      }
    }

    fetchAppointmentsData()
  }, [])

  const handleExportReport = () => {
    // Đảm bảo appointmentsData là đối tượng kiểu GroupedData
    const groupedData = appointmentsData.reduce(
      (acc, curr) => {
        if (!acc[curr.year]) {
          acc[curr.year] = []
        }
        acc[curr.year].push(curr)
        return acc
      },
      {} as Record<number, AppointmentData[]>,
    )
    let reportData: any[] = []
    const sortedYears = Object.keys(groupedData).sort((a, b) => parseInt(b) - parseInt(a));
    sortedYears.forEach((year) => {
      const yearData = groupedData[parseInt(year)]
      yearData.sort((a, b) => a.month - b.month);
      yearData.forEach((data, index) => {
        if (index === 0) {
          reportData.push({
            Năm: data.year,
            Tháng: '',
            SoCuocHen: '',
            DoanhThu: '',
          })
        }
        reportData.push({
          Năm: '',
          Tháng: data.month,
          SoCuocHen: data.totalAppointments,
          DoanhThu: data.totalAmount.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }),
        })
      })
    })
    const worksheet = XLSX.utils.json_to_sheet(reportData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Báo Cáo')
    XLSX.writeFile(workbook, 'bao_cao.xlsx')
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <Breadcrumb pageName={[['Thống kê', '/admin/chart']]} />
        <button
          onClick={handleExportReport}
          className="px-4 py-2 mr-8 bg-primary text-white text-sm font-medium rounded-md"
        >
          Xuất Báo Cáo
        </button>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-8">
          <div className="h-full bg-white rounded-lg shadow">
            <ChartOne />
          </div>
        </div>
        <div className="col-span-4 bg-white show border-stroke shadow-default">
          <div className="h-full rounded-sm shadow">
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
