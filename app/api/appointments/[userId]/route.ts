import { AppointmentRepository } from '@/repositories/appointment'
import {
  notFoundResponse,
  successResponse,
  internalServerErrorResponse,
  unauthorizedResponse,
  badRequestResponse,
} from '@/helpers/response'
import { ProfileRespository } from '@/repositories/profile'
import { UserRepository } from '@/repositories/user'
import Stripe from 'stripe'
import { BillRespository } from '@/repositories/bill'
import { UNAUTHENTICATED } from '@/validation/messageCode/commonMessageCode'
import { USER_NOT_FOUND } from '@/validation/messageCode/apiMessageCode/user'
import {
  APPOINTMENT_NOT_FOUND,
  GET_APPOINTMENT_ERROR,
  INVALID_CANCEL_APPOINTMENT,
} from '@/validation/messageCode/apiMessageCode/appointment'
import { PROFILE_NOT_FOUND } from '@/validation/messageCode/apiMessageCode/profile'
import { CANCEL_FAIL, CANCEL_SUCCESS } from '@/validation/messageCode/appointment'
export async function GET(req: Request, { params }: { params: { userId: string } }) {
  try {
    const profiles = await ProfileRespository.getListProfileByUserId(params.userId)

    if (!profiles || profiles.length === 0) {
      return notFoundResponse(PROFILE_NOT_FOUND)
    }

    const profileIds = profiles.map((profile) => profile.id)
    const allAppointments = []

    for (const profileId of profileIds) {
      const appointments =
        await AppointmentRepository.getAppointmentsByProfileId(profileId)
      allAppointments.push(...appointments)
    }

    if (allAppointments.length === 0) {
      return notFoundResponse(APPOINTMENT_NOT_FOUND)
    }

    const formattedAppointments = allAppointments.map((appointment) => ({
      id: appointment.id,
      patientName: appointment.profile.name,
      faculty: appointment.doctorSchedule.doctor.faculty.name,
      doctorName: `${appointment.doctorSchedule.doctor.academicTitle} ${appointment.doctorSchedule.doctor.name}`,
      serviceName: appointment.Service.name,
      price: appointment.Service.price,
      time: appointment.doctorSchedule.schedule.date,
      hour: appointment.doctorSchedule.schedule.timeSlot,
      status: appointment.status,
      doctorId: appointment.doctorSchedule.doctor.id,
      cancellationReason: appointment.cancellationReason || null,
    }))

    return successResponse(formattedAppointments)
  } catch (error) {
    console.error('Error in GET /api/appointments/[userId]:', error)
    return internalServerErrorResponse(GET_APPOINTMENT_ERROR)
  }
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
export async function PUT(req: Request, context: { params: { userId: string } }) {
  try {
    const body = await req.json()
    const { paymentIntentId, cancellationReason, appointmentId } = body
    const { userId } = context.params
    if (!userId) {
      return unauthorizedResponse(UNAUTHENTICATED)
    }
    const user = await UserRepository.getUserByUserId(userId)
    if (!user) {
      return notFoundResponse(USER_NOT_FOUND)
    }
    const oldAppointment = await AppointmentRepository.getAppoinmentById(appointmentId)
    if (!oldAppointment) {
      return notFoundResponse(APPOINTMENT_NOT_FOUND)
    }
    if (oldAppointment.status === 'PENDING') {
      const refundPaymentIntent = await stripe.refunds.create({
        payment_intent: paymentIntentId,
      })
      console.log('refundPaymentIntent', refundPaymentIntent)
      const cancelAppointment = await AppointmentRepository.cancelAppointment(
        cancellationReason,
        appointmentId,
      )
      if (!cancelAppointment?.payments) {
        throw new Error(INVALID_CANCEL_APPOINTMENT)
      }

      const cancelBill = await BillRespository.cancelBill(cancelAppointment.payments?.id)
      if (!cancelBill) {
        throw new Error(INVALID_CANCEL_APPOINTMENT)
      }
      return successResponse(CANCEL_SUCCESS)
    } else {
      return badRequestResponse(INVALID_CANCEL_APPOINTMENT)
    }
  } catch (error) {
    console.error(error)
    return internalServerErrorResponse(`Lỗi khi xử lý: ${error} ${CANCEL_FAIL}`)
  }
}
