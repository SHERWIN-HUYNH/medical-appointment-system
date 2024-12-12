import { badRequestResponse, notFoundResponse, successResponse } from '@/helpers/response'
import { DoctorRespository } from '@/repositories/doctor'
import { DOCTOR_NOT_FOUND } from '@/validation/messageCode/apiMessageCode/doctor'

interface Context {
  params: {
    doctorId: string
  }
}

export async function GET(req: Request, context: Context) {
  const { doctorId } = context.params // Lấy doctorId từ context

  if (!doctorId) {
    return badRequestResponse('MISSING DOCTOR ID')
  }
  const doctor = await DoctorRespository.getDoctorById(doctorId) // Fetch by ID
  if (!doctor) {
    return notFoundResponse(DOCTOR_NOT_FOUND)
  }
  return successResponse(doctor)
}
