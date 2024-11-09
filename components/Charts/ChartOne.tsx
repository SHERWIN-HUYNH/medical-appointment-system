'use client';
import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '../ui/button';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const options: ApexOptions = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#3C50E0', '#80CAEE'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    height: 335,
    type: 'area', // Dạng biểu đồ mặc định là "area"
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
    width: [2, 2],
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
    strokeColors: ['#3056D3', '#80CAEE'],
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
    categories: [],
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
    max: 100, // Giá trị tối đa mặc định cho biểu đồ tháng
  },
};

const ChartOne: React.FC = () => {
  const [viewBy, setViewBy] = useState<'month' | 'year'>('month');

  // Dữ liệu theo tháng
  const monthData = {
    categories: [
      'Tháng 1',
      'Tháng 2',
      'Tháng 3',
      'Tháng 4',
      'Tháng 5',
      'Tháng 6',
      'Tháng 7',
      'Tháng 8',
      'Tháng 9',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12',
    ],
    series: [
      { name: 'Năm 2022', data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45] },
      { name: 'Năm 2023', data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51] },
    ],
    chartType: 'line' as 'line',
    yMax: 100, // Sử dụng biểu đồ vùng cho tháng
  };

  // Dữ liệu theo năm
  const yearData = {
    categories: ['2020', '2021', '2022', '2023', '2024'], // Thêm các năm vào đây
    series: [
      { name: 'Doanh thu', data: [320, 450, 540, 600, 720] }, // Dữ liệu giả theo năm
    ],
    chartType: 'line' as 'line', // Sử dụng biểu đồ đường cho năm
    yMax: 1000, // Giá trị tối đa của trục y cho năm
  };

  const currentData = viewBy === 'month' ? monthData : yearData;

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Doanh thu</p>
              <p className="text-sm font-medium">Năm 2023</p>
            </div>
          </div>
          {/* Thêm chú thích cho Năm 2022 */}
          <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-[#6577F3]">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-[#6577F3]"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-[#6577F3]">Doanh thu</p>
              <p className="text-sm font-medium">Năm 2022</p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center border-slate-500 rounded-md bg-whiter p-1.5 dark:bg-meta-4 gap-2">
            <Button
              onClick={() => setViewBy('month')}
              className={`rounded px-3 py-1 text-xs font-medium text-black hover:bg-slate-500 hover:shadow-card dark:text-white dark:hover:bg-boxdark ${
                viewBy === 'month' ? 'bg-slate-400 text-white' : ''
              }`}
            >
              Tháng
            </Button>
            <Button
              onClick={() => setViewBy('year')}
              className={`rounded px-3 py-1 text-xs font-medium text-black hover:bg-slate-500 hover:shadow-card dark:text-white dark:hover:bg-boxdark ${
                viewBy === 'year' ? 'bg-slate-400 text-white' : ''
              }`}
            >
              Năm
            </Button>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={{
              ...options,
              chart: { ...options.chart, type: currentData.chartType }, // Chuyển đổi biểu đồ dựa trên lựa chọn
              xaxis: { ...options.xaxis, categories: currentData.categories },
              yaxis: { ...options.yaxis, max: currentData.yMax }, // Đặt giá trị tối đa của trục y
            }}
            series={currentData.series}
            type={currentData.chartType} // Kiểu biểu đồ cố định
            height={350}
            width={'100%'}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
