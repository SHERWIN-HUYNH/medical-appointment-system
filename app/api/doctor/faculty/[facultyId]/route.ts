import { badRequestResponse, successResponse } from '@/helpers/response';
import { DoctorRespository } from '@/repositories/doctor';

export async function GET(req: Request, context: { params: { facultyId: string } }) {
  try {
    const { facultyId } = context.params;
    const doctors = await DoctorRespository.getDoctorsByFaculty(facultyId);
    return successResponse(doctors);
  } catch (error) {
    console.error('Failed to fetch doctors:', error);
    return badRequestResponse('Failed to fetch doctors');
  }
}
