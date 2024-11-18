'use client';
import React from 'react';
import DefaultLayout from '@/components/Layouts/defaultLayout';
import Chart from '@/components/Charts/page';

const Thong_Ke = () => {
  return (
    <div>
      <DefaultLayout>
        <div>
          <Chart />
        </div>
      </DefaultLayout>
    </div>
  );
};

export default Thong_Ke;
