import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { DoctorRespository } from '@/repositories/doctor'
import { ServiceRepository } from '@/repositories/service'
import { ProfileRespository } from '@/repositories/profile'
import { notFoundResponse, successResponse } from '@/helpers/response'
import { DoctorScheduleRespository } from '@/repositories/doctorSchedule'
import { AppointmentRepository } from '@/repositories/appointment'
import { BillRespository } from '@/repositories/bill'
import { BillStatus } from '@prisma/client'
import { sendMail } from '@/lib/send-email'
import { createAppointmentEmailContent } from '@/lib/email/successful-appointment'
import { ScheduleRespository } from '@/repositories/schedule'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function POST(req: NextRequest) {
  const event = await stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get('stripe-signature') as string,
    process.env.STRIPE_WEBHOOK_SECRET as string,
  )
  console.log('STRIPE WEBHOOK', event)
  if (event.type === 'charge.succeeded' || event.type === 'charge.updated') {
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
      stripeCustomerId:charge.id
    })
    if (!appointment) {
      console.log('fail to create appointment')
      return notFoundResponse('FAIL TO CREATE APPOINTMENT')
    }
    console.log('APPOINTMENT webhook', appointment)
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
    const receiptUrl = charge.receipt_url ?? ''
    
    sendMail({
      sendTo: profile?.email,
      subject: 'Xác nhận Đặt lịch hẹn thành công',
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
