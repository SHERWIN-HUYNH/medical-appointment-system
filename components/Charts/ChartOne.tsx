'use client'
import { ApexOptions } from 'apexcharts'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '../ui/button'

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

interface AppointmentData {
  year: number
  month: number
  price: number
}

const chartTypeLine = 'line' as const

const options: ApexOptions = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#80CAEE'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    height: 335,
    type: chartTypeLine,
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },
    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2],
    curve: 'straight',
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: '#fff',
    strokeColors: ['#80CAEE'],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: 'category',
    categories: [], // Categories will be dynamically updated based on view (month or year)
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
    min: 0,
    max: 100, // Default max for monthly data
  },
}

const ChartOne: React.FC = () => {
  const [viewBy, setViewBy] = useState<'month' | 'year'>('month')
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
  const years = Array.from({ length: 5 }, (_, index) => new Date().getFullYear() - index)
  const [appointmentsData, setAppointmentsData] = useState<AppointmentData[]>([])

  // Monthly data
  const monthData = {
    categories: [
      'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
    ],
    series: [
      { name: `Doanh thu Năm ${selectedYear}`, data: appointmentsData.filter(a => a.year === selectedYear).map(a => a.price) },
    ],
    chartType: chartTypeLine,
    yMax: 100,
  }

  const fetchAppointmentsData = async () => {
    try {
      const response = await fetch(`/api/chart/chart2`)
      const data: AppointmentData[] = await response.json()
      setAppointmentsData(data)
    } catch (error) {
      console.error('Error fetching appointment data:', error)
    }
  }

  useEffect(() => {
    fetchAppointmentsData()
  }, [])

  // Yearly data (you can adjust this similarly to how you handle monthly data)
  const yearData = {
    categories: years.map(year => year.toString()), // Dynamic year categories based on available years
    series: [
      { name: 'Doanh thu', data: years.map(year => {
        const yearlyData = appointmentsData.filter(a => a.year === year)
        return yearlyData.reduce((total, item) => total + item.price, 0) // Calculate total price for each year
      }) },
    ],
    chartType: chartTypeLine,
    yMax: 1000,
  }

  const currentData = viewBy === 'month' ? monthData : yearData

  // Handle year change
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(event.target.value))
  }

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-[#6577F3]">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-[#6577F3]"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-[#6577F3]">Doanh thu</p>
              <p className="text-sm font-medium">{viewBy === 'month' ? `Năm ${selectedYear}` : 'Doanh thu theo năm'}</p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center border-slate-500 rounded-md bg-whiter p-1.5 dark:bg-meta-4 gap-2">
            <Button
              onClick={() => setViewBy('month')}
              className={`rounded px-3 py-1 text-xs font-medium text-black hover:bg-slate-500 hover:shadow-card dark:text-white dark:hover:bg-boxdark ${viewBy === 'month' ? 'bg-slate-400 text-white' : ''}`}
            >
              Tháng
            </Button>
            <Button
              onClick={() => setViewBy('year')}
              className={`rounded px-3 py-1 text-xs font-medium text-black hover:bg-slate-500 hover:shadow-card dark:text-white dark:hover:bg-boxdark ${viewBy === 'year' ? 'bg-slate-400 text-white' : ''}`}
            >
              Năm
            </Button>
            {viewBy === 'month' && (
              <select value={selectedYear} onChange={handleYearChange} className="rounded px-3 py-1 text-xs font-medium text-black dark:bg-boxdark dark:text-white">
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={{
              ...options,
              chart: { ...options.chart, type: currentData.chartType },
              xaxis: { ...options.xaxis, categories: currentData.categories },
              yaxis: { ...options.yaxis, max: currentData.yMax },
            }}
            series={currentData.series}
            type={currentData.chartType}
            height={350}
            width={'100%'}
          />
        </div>
      </div>
    </div>
  )
}

export default ChartOne
