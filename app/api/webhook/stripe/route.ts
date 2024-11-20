import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'
import { DoctorRespository } from '@/repositories/doctor'
import { ServiceRepository } from '@/repositories/service'
import { ProfileRespository } from '@/repositories/profile'
import { notFoundResponse, successResponse } from '@/helpers/response'
import { DoctorScheduleRespository } from '@/repositories/doctorSchedule'
import { AppointmentRepository } from '@/repositories/appointment'
import { BillRespository } from '@/repositories/bill'
import { BillStatus } from '@prisma/client'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
const resend = new Resend(process.env.RESEND_API_KEY as string)

export async function POST(req: NextRequest) {
  const event = await stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get('stripe-signature') as string,
    process.env.STRIPE_WEBHOOK_SECRET as string,
  )
  console.log('STRIPE WEBHOOK', event)
  if (event.type === 'charge.succeeded') {
    const charge = event.data.object
    const doctorId = charge.metadata.doctorId
    const scheduleId = charge.metadata.scheduleId
    const serviceId = charge.metadata.serviceId
    const profileId = charge.metadata.profileId
    const userId = charge.metadata.billId
    const pricePaidInCents = charge.amount
    const service = await ServiceRepository.getServicesById(serviceId)
    const doctor = await DoctorRespository.getDoctorById(doctorId)
    const profile = await ProfileRespository.getProfileById(profileId)
    console.log('service', doctorId, scheduleId)
    if (!service || !doctor || !profile) {
      return notFoundResponse('NOT FOUND SERVICE OR DOCTOR')
    }
    const doctorSchedule = await DoctorScheduleRespository.getDoctorScheduleById(
      scheduleId,
      doctorId,
    )
    if (!doctorSchedule) {
      return notFoundResponse('NOT FOUND DOCTOR SCHEDULE')
    }
    await DoctorScheduleRespository.updateStateSchedule(doctorSchedule.id)
    const appointment = await AppointmentRepository.createAppointment({
      doctorScheduleId: doctorSchedule.id,
      serviceId: service.id,
      profileId: profile.id,
    })
    if (!appointment) {
      return notFoundResponse('FAIL TO CREATE APPOINTMENT')
    }
    const billInfor = {
      price: pricePaidInCents,
      userId: userId,
      status: BillStatus.COMPLETED,
      appointmentId: appointment.id,
    }
    const bill = await BillRespository.createBill(billInfor)
    if (!bill) {
      return notFoundResponse('FAIL TO CREATE BILL')
    }
    const { data, error } = await resend.emails.send({
<<<<<<< HEAD
      from: `Support <${process.env.SENDER_EMAIL}>`,
=======
      from: `Acme <onboarding@resend.dev>`,
>>>>>>> c391485d0a29e40b074b8cf8212289422def40ed
      to: ['n21dccn191@student.ptithcm.edu.vn'],
      subject: 'Hello world',
      react: '<h1>hello world</h1>',
    })
    if (error) {
      console.log('email error', error)
    } else {
      console.log('email success', data)
    }
    return successResponse(appointment)
  }

  return new NextResponse()
}
