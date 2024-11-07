import { badRequestResponse, notFoundResponse, successResponse } from "@/helpers/response";
import { DoctorRespository } from "@/repositories/doctor";
import { ScheduleRepository } from "@/repositories/doctorSchedule";

export async function GET(req: Request, context: any) {
    const { doctorId } = context.params;
    const schedule = await ScheduleRepository.getDoctorSchedules(doctorId);
    if (!schedule) {
        return notFoundResponse("NOT FOUND SCHEDULE");
    }
    return successResponse(schedule);
}

export async function DELETE(req: Request, context: any) {
    const schedules = await req.json();
    const { doctorId } = context.params;
    const doctor = await DoctorRespository.getDoctorById(doctorId);
    if(!doctor) {
        return notFoundResponse("NOT FOUND DOCTOR");
    }
    const schedule = await ScheduleRepository.deleteDoctorSchedule(doctor.id,schedules);
    if (!schedule) {
        return notFoundResponse("NOT FOUND SCHEDULE");
    }
    return successResponse(schedule);
}

export async function POST(req: Request, context: any) {
    const schedules = await req.json();
    const { doctorId } = context.params;
    const doctor = await DoctorRespository.getDoctorById(doctorId);
    if(!doctor) {
        return notFoundResponse("NOT FOUND DOCTOR");
    }
    const schedule = await ScheduleRepository.saveSchedule(doctor.id,schedules);
    if (!schedule) {
        return badRequestResponse("FAIL TO SAVE SCHEDULE");
    }
    return successResponse(schedule);
}