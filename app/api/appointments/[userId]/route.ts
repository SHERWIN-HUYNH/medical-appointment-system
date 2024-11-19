import { AppointmentRepository } from '@/repositories/appointment';
import { notFoundResponse, successResponse, internalServerErrorResponse } from '@/helpers/response';

export async function GET(req: Request, { params }: { params: { profileId: string } }) {
  try {
    const appointments = await AppointmentRepository.getAppointmentsByProfileId(params.profileId);
    
    if (!appointments || appointments.length === 0) {
      return notFoundResponse('Không tìm thấy lịch khám');
    }

    const formattedAppointments = appointments.map((appointment) => ({
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
    }));

    return successResponse(formattedAppointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return internalServerErrorResponse('Lỗi khi lấy danh sách lịch khám');
  }
} 