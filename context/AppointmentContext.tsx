// src/context/AppointmentContext.tsx
'use client';

import { createContext, useContext, useState } from 'react';
import React from 'react';
type AppointmentData = {
  facultyId?: string;
  serviceId?: string;
  doctorId?: string;
  scheduleId?: string;
  userId?: string;
};

type AppointmentContextType = {
  data: AppointmentData;
  setData: (data: Partial<AppointmentData>) => void;
};

const AppointmentContext = createContext<AppointmentContextType | null>(null);

export const AppointmentProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<AppointmentData>({});
  const updateData = (newData: Partial<AppointmentData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };
  return (
    <AppointmentContext.Provider value={{ data, setData: updateData }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointmentContext = () => {
  const context = useContext(AppointmentContext);
  if (!context)
    throw new Error('useAppointmentContext must be used within an AppointmentProvider');
  return context;
};
