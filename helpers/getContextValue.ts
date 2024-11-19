import { useAppointmentContext } from '@/context/AppointmentContext';

export async function getContextValue() {
  const { data } = useAppointmentContext();
  return data;
}
