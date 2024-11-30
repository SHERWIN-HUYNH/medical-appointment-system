import { AppointmentRepository } from '@/repositories/appointment'
import {
  notFoundResponse,
  successResponse,
  internalServerErrorResponse,
} from '@/helpers/response'
import { ProfileRespository } from '@/repositories/profile'

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

    console.log('Formatted appointments:', formattedAppointments);

    return successResponse(formattedAppointments)
  } catch (error) {
    console.error('Error in GET /api/appointments/[userId]:', error);
    return internalServerErrorResponse('Lỗi khi lấy danh sách lịch khám')
  }
}
