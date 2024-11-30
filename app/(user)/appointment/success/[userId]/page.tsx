import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import React from 'react'
import { User } from 'lucide-react'
import Stripe from 'stripe'
import { AppointmentRepository } from '@/repositories/appointment'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
const RequestSuccess = async ({
  searchParams,
}: {
  searchParams: { payment_intent: string; userId: string }
}) => {
  const paymentIntent = await stripe.paymentIntents.retrieve(searchParams.payment_intent)
  console.log('PAYMENT INTENT SUCCESS', paymentIntent)
  if (paymentIntent.metadata.billId == null) return <h1>NOT FOUND</h1>
<<<<<<< HEAD
  const appointment = await AppointmentRepository.getAppointmentByDoctorAndSchedule(
    paymentIntent.metadata.doctorId,
    paymentIntent.metadata.scheduleId,
  )
  if (!appointment) return <h1>NOT APPOINTMENT</h1>
=======
  const appointment = await AppointmentRepository.getAppointmentByDoctorAndSchedule(paymentIntent.metadata.doctorId,paymentIntent.metadata.scheduleId)
  // if(!appointment) return <h1>NOT APPOINTMENT</h1>
  console.log('APPOINMENT SUCCESS',appointment)
>>>>>>> 623051e025eebde0b1561410a7fffa67ada73329
  const isSuccess = paymentIntent.status === 'succeeded'
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
            Yêu cầu <span className="text-green-500">đặt lịch hẹn</span> của bạn đã thành
            công!
          </h2>
        </section>

        <section className="request-details">
          <p>Thông tin cuộc hẹn:</p>
          <div className="flex items-center gap-3">
            <User />
            <p className="whitespace-nowrap"></p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            {/* <p> {formatDateTime(appointment.schedule).dateTime}</p> */}
<<<<<<< HEAD
            <p>
              {appointment.doctorSchedule.schedule.date}{' '}
              {appointment.doctorSchedule.schedule.timeSlot}
            </p>
=======
            <p></p>
>>>>>>> 623051e025eebde0b1561410a7fffa67ada73329
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          {isSuccess ? (
            <Link href={`/`}>Quay lại trang chủ</Link>
          ) : (
            <Link href={`/doctor`}>Chọn lại lịch hẹn</Link>
          )}
        </Button>

        <p className="copyright">© 2024 CarePluse</p>
      </div>
    </div>
  )
}

export default RequestSuccess
