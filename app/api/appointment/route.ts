import { successResponse } from '@/helpers/response'
import { AppointmentRepository } from '@/repositories/appointment'

export async function GET() {
  const appointments = await AppointmentRepository.getAllAppointments()
  return successResponse(appointments)
}
