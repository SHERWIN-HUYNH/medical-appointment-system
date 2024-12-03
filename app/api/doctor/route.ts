import {
  badRequestResponse,
  forbiddenResponse,
  notFoundResponse,
  successResponse,
} from '@/helpers/response'
import { DoctorRespository } from '@/repositories/doctor'

export async function GET() {
  const doctors = await DoctorRespository.getDoctores()
  return successResponse(doctors)
}

export async function POST(req: Request) {
  const doctorData = await req.json()
  if (!doctorData) {
    return badRequestResponse('MISSING DOCTOR DATA')
  }
  try {
    const newDoctor = await DoctorRespository.createDoctor(doctorData)
    return successResponse(newDoctor)
  } catch (error) {
    console.log(error)
    return badRequestResponse('FAIL TO CREATE DOCTOR')
  }
}

export async function PUT(req: Request) {
  const { doctor } = await req.json()
  const doctorData = await DoctorRespository.getDoctorById(doctor.id)
  if (!doctorData) {
    return notFoundResponse('DOCTOR NOT FOUND')
  }

  // Kiểm tra nếu đang thay đổi chuyên khoa
  if (doctorData.facultyId !== doctor.faculty) {
    const hasAppointments = await DoctorRespository.hasAppointments(doctor.id)
    if (hasAppointments) {
      return forbiddenResponse(
        'Bác sĩ này đang có cuộc hẹn không thể thay đổi chuyên khoa',
      )
    }
  }

  // Kiểm tra nếu đang chuyển trạng thái từ active sang inactive
  if (doctorData.isActive && !doctor.isActive) {
    const hasAppointments = await DoctorRespository.hasAppointments(doctor.id)
    if (hasAppointments) {
      return forbiddenResponse('Bác sĩ này đang có cuộc hẹn không thể chuyển trạng thái')
    }
  }

  const updatedDoctor = await DoctorRespository.updateDoctor(doctor.id, {
    ...doctor,
    facultyId: doctor.faculty, // Đảm bảo mapping đúng trường faculty
  })

  if (!updatedDoctor) {
    return badRequestResponse('FAIL TO UPDATE DOCTOR')
  }
  return successResponse(updatedDoctor)
}

// Xử lý DELETE request - Xóa bác sĩ theo ID
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()
    const deletedDoctor = await DoctorRespository.deleteDoctor(id)
    return successResponse(deletedDoctor)
  } catch (error) {
    if (error instanceof Error) {
      return forbiddenResponse(error.message)
    }
    return badRequestResponse('Xóa bác sĩ thất bại')
  }
}
