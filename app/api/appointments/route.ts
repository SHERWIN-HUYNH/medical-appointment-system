import { internalServerErrorResponse, successResponse } from "@/helpers/response";
import { AppointmentRepository } from "@/repositories/appointment";

export async function GET() {
    try {
        const countAppointment = await AppointmentRepository.getAllAppointments()
        return successResponse(countAppointment)
    } catch (error) {
        return internalServerErrorResponse(error as string)
    }
}