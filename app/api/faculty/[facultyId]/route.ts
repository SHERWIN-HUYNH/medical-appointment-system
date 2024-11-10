import {
  badRequestResponse,
  notFoundResponse,
  successResponse,
} from '@/helpers/response';
import { FacultyRepository } from '@/repositories/faculty';

export async function GET(req: Request, context: { params: { facultyId: string } }) {
  const { facultyId } = context.params;
  if (!facultyId) {
    return badRequestResponse('MISSING FACULTY ID');
  }
  const faculty = await FacultyRepository.getFacultyById(facultyId);
  if (!faculty) {
    return notFoundResponse('FACULTY NOT FOUND');
  }
  return successResponse(faculty);
}
