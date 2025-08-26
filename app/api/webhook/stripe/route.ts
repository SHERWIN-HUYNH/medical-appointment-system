import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { DoctorRespository } from '@/repositories/doctor'
import { ServiceRepository } from '@/repositories/service'
import { ProfileRespository } from '@/repositories/profile'
import { badRequestResponse, notFoundResponse, successResponse } from '@/helpers/response'
import { DoctorScheduleRespository } from '@/repositories/doctorSchedule'
import { AppointmentRepository } from '@/repositories/appointment'
import { BillRespository } from '@/repositories/bill'
import { BillStatus } from '@prisma/client'
import { sendMail } from '@/lib/send-email'
import { createAppointmentEmailContent } from '@/lib/email/successful-appointment'
import { ScheduleRespository } from '@/repositories/schedule'
import { SERVICE_NOT_FOUND } from '@/validation/messageCode/apiMessageCode/service'
import { SCHEDULE_NOT_FOUND } from '@/validation/messageCode/apiMessageCode/schedule'
import {
  CONFRIM_BOOKED_APPOINTMENT,
  CREATE_APPOINMENT_FAIL,
} from '@/validation/messageCode/apiMessageCode/appointment'
import { CREATE_BILL_FAIL } from '@/validation/messageCode/apiMessageCode/bill'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function POST(req: NextRequest) {
  const event = await stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get('stripe-signature') as string,
    process.env.STRIPE_WEBHOOK_SECRET as string,
  )
  if (event.type === 'charge.succeeded') {
    const charge = event.data.object
    const doctorId = charge.metadata.doctorId
    const scheduleId = charge.metadata.scheduleId
    const serviceId = charge.metadata.serviceId
    const profileId = charge.metadata.profileId
    const userId = charge.metadata.billId
    const pricePaidInCents = charge.amount
    const schedule = await ScheduleRespository.getScheduleById(scheduleId)
    const service = await ServiceRepository.getServicesById(serviceId)
    const doctor = await DoctorRespository.getDoctorById(doctorId)
    const profile = await ProfileRespository.getProfileById(profileId)
    if (!service || !doctor || !profile) {
      return notFoundResponse(SERVICE_NOT_FOUND)
    }
    const doctorSchedule = await DoctorScheduleRespository.getDoctorScheduleById(
      scheduleId,
      doctorId,
    )
    if (!doctorSchedule) {
      return notFoundResponse(SCHEDULE_NOT_FOUND)
    }
    const appointment = await AppointmentRepository.createAppointment({
      userId: userId,
      doctorScheduleId: doctorSchedule.id,
      serviceId: service.id,
      profileId: profile.id,
      stripeCustomerId: charge.payment_intent as string,
    })
    console.log('appointment', appointment)
    if (!appointment) {
      return badRequestResponse(CREATE_APPOINMENT_FAIL)
    }
    const billInfor = {
      price: pricePaidInCents,
      userId: userId,
      status: BillStatus.COMPLETED,
      appointmentId: appointment.id,
    }
    const bill = await BillRespository.createBill(billInfor)
    if (!bill) {
      return notFoundResponse(CREATE_BILL_FAIL)
    }
    const receiptUrl = charge.receipt_url ?? ''

    sendMail({
      sendTo: profile?.email,
      subject: CONFRIM_BOOKED_APPOINTMENT,
      text: '',
      html: createAppointmentEmailContent(
        profile.name,
        service.name,
        doctor.name,
        schedule.date,
        schedule.timeSlot,
        profile.phone,
        profile.email,
        receiptUrl,
      ),
    })
    return successResponse(appointment)
  }

  return new NextResponse()
}
