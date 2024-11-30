import { AppointmentRepository } from '@/repositories/appointment'
import {
  notFoundResponse,
  successResponse,
  internalServerErrorResponse,
  unauthorizedResponse,
} from '@/helpers/response'
import { ProfileRespository } from '@/repositories/profile'
import { UserRepository } from '@/repositories/user'
import Stripe from 'stripe'
import { BillRespository } from '@/repositories/bill'
export async function GET(req: Request, { params }: { params: { userId: string } }) {
  try {
    // First get all profiles for this user
    const profiles = await ProfileRespository.getListProfileByUserId(params.userId)

    if (!profiles || profiles.length === 0) {
      return notFoundResponse('Không tìm thấy hồ sơ bệnh nhân')
    }

    // Get appointments for all profiles
    const profileIds = profiles.map((profile) => profile.id)
    const allAppointments = []

    for (const profileId of profileIds) {
      const appointments =
        await AppointmentRepository.getAppointmentsByProfileId(profileId)
      allAppointments.push(...appointments)
    }

    if (allAppointments.length === 0) {
      return notFoundResponse('Không tìm thấy lịch khám')
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
    console.error('Error fetching appointments:', error)
    return internalServerErrorResponse('Lỗi khi lấy danh sách lịch khám')
  }
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
export async function PUT(req: Request, context: { params: { userId: string } }) {
  try {
    const body = await req.json()
    const {paymentIntentId,cancellationReason} = body
    const { userId } = context.params

    if (!userId) {
      return unauthorizedResponse('UNAUTHENTICATED')
    }
    const user = await UserRepository.getUserByUserId(userId)
    if (!user) {
      return notFoundResponse('Không tìm thấy người dụng')
    }
    const canceledPaymentIntent = await stripe.paymentIntents.cancel(paymentIntentId,{
      cancellation_reason: cancellationReason
    });
    if(!canceledPaymentIntent) {
      console.log('CANCELED PAYMENT INTENT')
    }
    const refundPaymentIntent = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: canceledPaymentIntent.amount
    });
    console.log('REFUND PAYMENT INTENT', refundPaymentIntent)
    const cancelAppointment =await AppointmentRepository.cancelAppointment(paymentIntentId, cancellationReason)
    if (!cancelAppointment?.payments) {
      throw new Error("Cancel appointment operation failed; appointment not found.");
    }
    const cancelBill = BillRespository.cancelBill(cancelAppointment.payments?.id)
    if(!cancelBill) {
      throw new Error("Cancel bill operation failed; bill not found.");
    }
    // Send email to inform the patient that the appointment has been canceled
    return successResponse({cancelAppointment})
  } catch (error) {
    return internalServerErrorResponse(`Lỗi khi lấy danh sách lịch khám ${error}`)
  }
}
