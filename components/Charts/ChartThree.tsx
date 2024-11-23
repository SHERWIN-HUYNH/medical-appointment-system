import React, { useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

interface AppointmentSummary {
  facultyId: string
  facultyName: string
  scheduledAppointments: number
}

const ChartThree: React.FC = () => {
  const [series, setSeries] = useState<number[]>([])
  const [labels, setLabels] = useState<string[]>([])
  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'donut',
    },
    colors: ['#06b6d4', '#60a5fa', '#818cf8', '#a78bfa'], // Các màu hiển thị
    labels: [],
    legend: {
      show: false,
      position: 'bottom',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      y: {
        formatter: (val) => `${val.toFixed(2)}%`, // Hiển thị phần trăm trong tooltip
      },
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  })

  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const response = await fetch('/api/chart', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Lỗi khi lấy dữ liệu báo cáo');
        }
  
        const data: AppointmentSummary[] = await response.json();
  
        // Tính tổng số cuộc hẹn
        const totalAppointments = data.reduce(
          (acc, curr) => acc + curr.scheduledAppointments,
          0
        );
  
        // Tính tỷ lệ phần trăm cho mỗi khoa
        const updatedData = data.map((item) => ({
          ...item,
          percentage: totalAppointments
            ? ((item.scheduledAppointments / totalAppointments) * 100).toFixed(2)
            : '0',
        }));
  
        console.log('Dữ liệu sau khi tính toán:', updatedData);
        setLabels(updatedData.map((item) => String(item.facultyName))); 
        setSeries(updatedData.map((item) => parseFloat(item.percentage))); 
        setOptions((prevOptions) => ({
          ...prevOptions,
          labels: updatedData.map((item) => String(item.facultyName)), 
        }));
      } catch (error) {
        console.error('Error fetching appointment data:', error);
      }
    };
  
    fetchAppointmentData();
  }, []);
  

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xs font-semibold text-black dark:text-white">
            Thống Kê Lịch Hẹn Theo Chuyên Khoa
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart options={options} series={series} type="donut" />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        {labels.map((label, index) => (
          <div key={index} className="w-full px-8 sm:w-1/2">
            <div className="flex w-full items-center">
              <span
                className={`mr-2 block h-3 w-full max-w-3 rounded-full`}
                style={{
                  backgroundColor: options.colors?.[index % options.colors.length],
                }}
              ></span>
              <p className="flex w-full justify-between text-xs font-medium text-black dark:text-white">
                <span>{label}</span>
                <span>{series[index]}%</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChartThree
