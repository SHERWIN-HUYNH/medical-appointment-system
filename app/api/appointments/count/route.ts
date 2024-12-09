import { badRequestResponse, successResponse } from '@/helpers/response'
import { AppointmentRepository } from '@/repositories/appointment'

export async function GET() {
  try {
    const appointments = await AppointmentRepository.CountAppointment()
    return successResponse(appointments)
  } catch (error) {
    console.log(error)
    return badRequestResponse('FAIL TO GET APPOINTMENTS')
  }
}
