import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import React from 'react';
import { User } from 'lucide-react';
import Stripe from 'stripe';
import { notFound } from 'next/navigation';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const RequestSuccess = async ({
  searchParams,
}: {
  searchParams: { payment_intent: string };
}) => {
  const userId = '243rwkefskf';
  const paymentIntent = await stripe.paymentIntents.retrieve(searchParams.payment_intent);
  console.log('PAYMENT INTENT', paymentIntent);
  if (paymentIntent.metadata.billId == null) return <h1>NOT FOUND</h1>;
  const isSuccess = paymentIntent.status === 'succeeded';
  return (
    <div className=" flex h-screen max-h-screen px-[5%] bg-[#4158D0] bg-[linear-gradient(43deg,#4158D0_0%,#C850C0_46%,#FFCC70_100%)]">
      <div className="success-img max-w-[800px] bg-white">
        <Link
          href="/"
          className="bg-primary w-[600px] rounded-full p-3 flex items-center justify-center"
        >
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit block"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image src="/assets/gifs/success.gif" height={300} width={280} alt="success" />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has been
            successfully submitted!
          </h2>
          <p>We&apos;ll be in touch shortly to confirm.</p>
        </section>

        <section className="request-details">
          <p>Requested appointment details: </p>
          <div className="flex items-center gap-3">
            {/* <Image
              src={doctor?.image!}
              alt="doctor"
              width={100}
              height={100}
              className="size-6"
            /> */}
            <User />
            <p className="whitespace-nowrap">Dr.Nguyen Minh Chau</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            {/* <p> {formatDateTime(appointment.schedule).dateTime}</p> */}
            <p>11/10/2024 12:00-12:30 PM</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          {isSuccess ? (
            <a
            // href={`/products/download/${await createDownloadVerification(
            //   product.id
            // )}`}
            >
              Download
            </a>
          ) : (
            <Link href={`/appointment/${userId}/payment`}>Quay lại trang thanh toán</Link>
          )}
        </Button>

        <p className="copyright">© 2024 CarePluse</p>
      </div>
    </div>
  );
};

export default RequestSuccess;
