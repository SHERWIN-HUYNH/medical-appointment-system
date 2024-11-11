import { CheckoutForm } from '@/components/CheckoutForm';
import UserLayout from '@/components/Layouts/userLayout';
import React from 'react';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const Appointment = async () => {
  const serviceInfor = {
    price: 10000,
    name: 'Khoa tim mach',
    customerId: '0a27a6fc-915c-40b7-b456-bba2a82ea3f4',
  };
  const paymentIntent = await stripe.paymentIntents.create({
    amount: serviceInfor.price,
    currency: 'usd',
    metadata: { billId: serviceInfor.customerId },
  });
  console.log('paymentIntent', paymentIntent);
  console.log('STRIPE',process.env.STRIPE_SECRET_KEY)
  if (paymentIntent.client_secret == null) {
    throw new Error('Stripe failed to create payment intent');
  }
  return (
    <UserLayout>
      <div className="style_body">
        <CheckoutForm clientSecret={paymentIntent.client_secret} product={serviceInfor} />
      </div>
    </UserLayout>
  );
};

export default Appointment;
