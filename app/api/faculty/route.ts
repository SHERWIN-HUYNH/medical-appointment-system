import {
  badRequestResponse,
  notFoundResponse,
  successResponse,
  forbiddenResponse,
  conflictResponse,
} from '@/helpers/response'
import { FacultyRepository } from '@/repositories/faculty'

// Xử lý GET request - Lấy một hoặc tất cả chuyên khoa
export async function GET() {
  try {
    const faculties = await FacultyRepository.getFaculties()
    return successResponse(faculties)
  } catch (error) {
    console.log(error)
    return badRequestResponse('Failed to fetch faculties')
  }
}

// Xử lý POST request - Tạo chuyên khoa mới
export async function POST(req: Request) {
  const faculty = await req.json()

  if (!faculty) {
    return badRequestResponse('MISSING SERVICE DATA')
  }

  try {
    // Kiểm tra xem chuyên khoa đã tồn tại chưa
    const exists = await FacultyRepository.checkFacultyExists(faculty.name)
    
    if (exists) {
      return conflictResponse('Chuyên khoa này đã tồn tại trong hệ thống')
    }

    const newFaculty = await FacultyRepository.createFaculty(faculty)

    if (!newFaculty) {
      return badRequestResponse('FAIL TO CREATE FACULTY')
    }

    return successResponse(newFaculty)
  } catch (error) {
    console.error('Error creating faculty:', error)
    return badRequestResponse('Có lỗi xảy ra khi tạo chuyên khoa')
  }
}

export async function PUT(req: Request) {
  const { faculty } = await req.json()
  const facultyData = await FacultyRepository.getFacultyById(faculty.id)
  if (!facultyData) {
    return notFoundResponse('NOT FOUND FACULTY')
  }
  const updatedFaculty = await FacultyRepository.updateFaculty(faculty, facultyData.id)
  if (!updatedFaculty) {
    return badRequestResponse('FAIL TO UPDATE FACULTY')
  }
  return successResponse(updatedFaculty)
}

// Xử lý DELETE request - Xóa chuyên khoa
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()
    const deletedFaculty = await FacultyRepository.deleteFaculty(id)
    return successResponse(deletedFaculty)
  } catch (error) {
    if (error instanceof Error) {
      return forbiddenResponse(error.message)
    }
    return badRequestResponse('Xóa dịch vụ thất bại')
  }
}
