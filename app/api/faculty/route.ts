import {
  badRequestResponse,
  notFoundResponse,
  successResponse,
} from '@/helpers/response';
import { FacultyRepository } from '@/repositories/faculty';

// Xử lý GET request - Lấy một hoặc tất cả chuyên khoa
export async function GET() {
  try {
    const faculties = await FacultyRepository.getFaculties();
    return successResponse(faculties || []);
  } catch (error) {
    console.log(error);
    return badRequestResponse('Failed to fetch faculties');
  }
}

// Xử lý POST request - Tạo chuyên khoa mới
export async function POST(req: Request) {
  const faculty = await req.json();

  if (!faculty) {
    return badRequestResponse('MISSING SERVICE DATA');
  }

  const newFaculty = await FacultyRepository.createFaculty(faculty);

  if (!newFaculty) {
    return badRequestResponse('FAIL TO CREATE Faculty');
  }

  return successResponse(newFaculty);
}

export async function PUT(req: Request) {
  const { faculty } = await req.json();
  const facultyData = await FacultyRepository.getFacultyById(faculty.id);
  if (!facultyData) {
    return notFoundResponse('NOT FOUND FACULTY');
  }
  const updatedFaculty = await FacultyRepository.updateFaculty(faculty, facultyData.id);
  if (!updatedFaculty) {
    return badRequestResponse('FAIL TO UPDATE FACULTY');
  }
  return successResponse(updatedFaculty);
}

// Xử lý DELETE request - Xóa chuyên khoa
export async function DELETE(req: Request) {
  const { faculty } = await req.json();
  const deletedFaculty = await FacultyRepository.deleteFaculty(faculty);
  if (!deletedFaculty) {
    return badRequestResponse('FAIL TO DELETE FACULTY');
  }
  return successResponse(deletedFaculty);
}
