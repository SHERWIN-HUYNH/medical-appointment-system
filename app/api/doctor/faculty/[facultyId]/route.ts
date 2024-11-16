import {
  badRequestResponse,
  notFoundResponse,
  successResponse,
} from '@/helpers/response';
import { DoctorRespository } from '@/repositories/doctor';

export async function GET(req: Request, context: { params: { facultyId: string } }) {
  try {
    const { facultyId } = context.params;
    const doctors = await DoctorRespository.getDoctorsByFaculty(facultyId);
    return successResponse(doctors);
  } catch (error) {
    return badRequestResponse('Failed to fetch doctors');
  }
}
