import {
  badRequestResponse,
  notFoundResponse,
  successResponse,
} from '@/helpers/response';
import { DoctorRespository } from '@/repositories/doctor';
import { DoctorScheduleRespository } from '@/repositories/doctorSchedule';

export async function GET(req: Request, context: any) {
  const { doctorId } = context.params;
  const doctor = await DoctorRespository.getDoctorById(doctorId);
  if (!doctor) {
    return notFoundResponse('NOT FOUND DOCTOR');
  }
  const schedule = await DoctorScheduleRespository.getDoctorSchedules(doctorId);
  return successResponse(schedule);
}

export async function DELETE(req: Request, context: any) {
  const schedules = await req.json();
  const { doctorId } = context.params;
  const doctor = await DoctorRespository.getDoctorById(doctorId);
  if (!doctor) {
    return notFoundResponse('NOT FOUND DOCTOR');
  }
  const schedule = await DoctorScheduleRespository.deleteDoctorSchedule(doctor.id, schedules);
  if (!schedule) {
    return notFoundResponse('NOT FOUND SCHEDULE');
  }
  return successResponse(schedule);
}

export async function POST(req: Request, context: any) {
  const schedules = await req.json();
  const { doctorId } = context.params;
  const doctor = await DoctorRespository.getDoctorById(doctorId);
  if (!doctor) {
    return notFoundResponse('NOT FOUND DOCTOR');
  }
  const schedule = await DoctorScheduleRespository.saveSchedule(doctor.id, schedules);
  if (!schedule) {
    return badRequestResponse('FAIL TO SAVE SCHEDULE');
  }
  return successResponse(schedule);
}
