import {
  badRequestResponse,
  notFoundResponse,
  successResponse,
} from '@/helpers/response';
import { FacultyRepository } from '@/repositories/faculty';

export async function GET(
  req: Request,
  context: { params: { facultyId: string } }
) {
  try {
    const { facultyId } = context.params;
    const faculty = await FacultyRepository.getFacultyById(facultyId);
    
    if (!faculty) {
      return notFoundResponse('Faculty not found');
    }
    
    return successResponse(faculty);
  } catch (error) {
    return badRequestResponse('Failed to fetch faculty');
  }
}
