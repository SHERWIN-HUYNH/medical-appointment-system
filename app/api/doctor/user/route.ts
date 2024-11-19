import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
} from '@/helpers/response'
import { DoctorRespository } from '@/repositories/doctor'

export async function GET() {
  try {
    const doctors = await DoctorRespository.getListDoctorsIsActive()
    if (!doctors || doctors.length === 0) {
      return notFoundResponse('NOT FOUND DOCTOR')
    }
    return successResponse(doctors)
  } catch (error: any) {
    console.error('Error fetching doctors:', error.message || error)
    return internalServerErrorResponse('FAIL TO GET LIST DOCTORS')
  }
}
