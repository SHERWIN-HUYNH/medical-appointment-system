import {
  badRequestResponse,
  notFoundResponse,
  successResponse,
} from '@/helpers/response';
import { DoctorRespository } from '@/repositories/doctor';

// Xử lý GET request - Lấy thông tin bác sĩ theo ID
export async function GET(req: Request, context: any) {
  const { doctorId } = context.params; // Lấy doctorId từ context

  if (!doctorId) {
    return badRequestResponse('MISSING DOCTOR ID');
  }

  const doctor = await DoctorRespository.getDoctorById(doctorId); // Fetch by ID
  if (!doctor) {
    return notFoundResponse('DOCTOR NOT FOUND');
  }
  return successResponse(doctor);
}
