import { CheckoutForm } from '@/components/CheckoutForm';
import UserLayout from '@/components/Layouts/userLayout';

import React from 'react';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const Appointment = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  // const doctorId = (await searchParams).doctorId
  const scheduleId = (await searchParams).scheduleId;
  const timeSlot = (await searchParams).timeSlot as string;
  const date = (await searchParams).date as string;
  const profileId = (await searchParams).profileId;
  const userId = (await searchParams).userId as string;

  const serviceInfor = {
    price: 100000,
    name: 'Khoa tim mach',
    customerId: userId,
  };
  const paymentIntent = await stripe.paymentIntents.create({
    amount: serviceInfor.price,
    currency: 'vnd',
    metadata: { billId: serviceInfor.customerId },
  });

  if (paymentIntent.client_secret == null) {
    throw new Error('Stripe failed to create payment intent');
  }
  return (
    <UserLayout>
      <div className="style_body">
        <CheckoutForm
          clientSecret={paymentIntent.client_secret}
          product={serviceInfor}
          timeSlot={timeSlot}
          date={date}
        />
      </div>
    </UserLayout>
  );
};

export default Appointment;
