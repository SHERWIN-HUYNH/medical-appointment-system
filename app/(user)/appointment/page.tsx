
import { CheckoutForm } from '@/components/CheckoutForm';
import UserLayout from '@/components/Layouts/userLayout';
import { DoctorRespository } from '@/repositories/doctor';
import { FacultyRepository } from '@/repositories/faculty';
import { ScheduleRespository } from '@/repositories/schedule';
import { ServiceRepository } from '@/repositories/service';

import React from 'react';
import Stripe from 'stripe';
type AppointmentProps = {
  userId: string;
  timeSlot: string;
  date: string;
  doctorId:string;
  serviceId:string;
  facultyId:string;
  profileId:string
};
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
// { params }:{params :{ objectId: string; timeSlot: string; date: string}}
const  Appointment = async ({ searchParams }: { searchParams: AppointmentProps })=> {
  const doctorId = searchParams.doctorId
  const serviceId = searchParams.serviceId
  const facultyId = searchParams.facultyId
  const userId = searchParams.userId
  const profileId = searchParams.profileId
  const timeSlot = searchParams.timeSlot as string
  const date = searchParams.date as string

  const doctor = await DoctorRespository.getDoctorById(doctorId);
  const service = await ServiceRepository.getServicesById(serviceId);
  const faculty = await FacultyRepository.getFacultyById(facultyId);
  const schedule = await ScheduleRespository.getScheduleByDateAndTime(date, timeSlot);
  const serviceInfor = {
    price: service?.price,
    name: faculty?.name,
    customerId: userId,
  };
  if(!service || !doctor){
    return <h1>Service or Doctor not found</h1>
  }
  const paymentIntent = await stripe.paymentIntents.create({
    amount: serviceInfor.price ?? 0,
    currency: 'usd',
    metadata: { 
      billId: serviceInfor.customerId,
      doctorId: doctorId,
      serviceId: serviceId,
      profileId: profileId,
      scheduleId: schedule.id,
    },
  });
  if (paymentIntent.client_secret == null) {
    throw new Error('Stripe failed to create payment intent');
  }
  return (
    <UserLayout>
      <div className="style_body">
        <CheckoutForm clientSecret={paymentIntent.client_secret} product={serviceInfor} timeSlot={timeSlot} date={date}/>
      </div>
    </UserLayout>
  );
};

export default Appointment;
