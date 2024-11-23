import { badRequestResponse, notFoundResponse, successResponse } from "@/helpers/response";
import { ChartRepository } from "@/repositories/chart";

export async function GET() {
    try {
      const appointments = await ChartRepository.getAppointmentByDate();
  
      if (!appointments || appointments.length === 0) {
        return notFoundResponse('NOT FOUND APPOINTMENTS');
      }
  
      return successResponse(appointments);
    } catch (error) {
      console.error('Error fetching appointments summary:', error);
      return badRequestResponse('FAIL TO GET REPORT');
    }
  }
  