import {
  badRequestResponse,
  notFoundResponse,
  successResponse,
} from '@/helpers/response';
import { DoctorRespository } from '@/repositories/doctor';

export async function GET() {
  const doctors = await DoctorRespository.getDoctores();
  return successResponse(doctors);
}

export async function POST(req: Request) {
  const doctorData = await req.json();
  if (!doctorData) {
    return badRequestResponse('MISSING DOCTOR DATA');
  }
  try {
    const newDoctor = await DoctorRespository.createDoctor(doctorData);
    return successResponse(newDoctor);
  } catch (error) {
    console.log(error);
    return badRequestResponse('FAIL TO CREATE DOCTOR');
  }
}

export async function PUT(req: Request) {
  const { doctor } = await req.json();
  const doctorData = await DoctorRespository.getDoctorById(doctor.id);
  if (!doctorData) {
    return notFoundResponse('DOCTOR NOT FOUND');
  }
  // Kiểm tra nếu đang chuyển trạng thái từ active sang inactive
  if (doctorData.isActive && !doctor.isActive) {
    const hasAppointments = await DoctorRespository.hasAppointments(doctor.id);
    if (hasAppointments) {
      return badRequestResponse(
        'Bác sĩ này đang có cuộc hẹn không thể chuyển trạng thái',
      );
    }
  }
  const updatedFaculty = await DoctorRespository.updateDoctor(doctor.id, doctor);
  if (!updatedFaculty) {
    return badRequestResponse('FAIL TO UPDATE DOCTOR');
  }
  return successResponse(updatedFaculty);
}

// Xử lý DELETE request - Xóa bác sĩ theo ID
export async function DELETE(req: Request) {
  const { doctor } = await req.json();

  if (!doctor?.id) {
    return badRequestResponse('Missing doctor ID');
  }

  try {
    const deletedDoctor = await DoctorRespository.deleteDoctor(doctor.id);
    return successResponse(deletedDoctor);
  } catch (error: any) {
    return badRequestResponse(error.message);
  }
}
