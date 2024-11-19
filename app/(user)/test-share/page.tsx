'use client';

import { useAppointmentContext } from '@/context/AppointmentContext';
import ServerComponent from './_component/ServerComponent';
import React from 'react';

const Test = () => {
  const { data, setData } = useAppointmentContext();
  setData({ userId: '123' });
  console.log(data);
  return <ServerComponent userId={data?.userId ?? 'sfsfsdfd'} />;
};

export default Test;