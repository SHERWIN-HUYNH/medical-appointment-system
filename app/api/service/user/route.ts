import { internalServerErrorResponse, notFoundResponse, successResponse } from "@/helpers/response";
import { ServiceRepository } from "@/repositories/service";

export async function GET(request: Request, context: { params: { facultyId: string } }) {
    const { facultyId } = context.params;
  
    try {
      const services = await ServiceRepository.getServicesByFacultyId(facultyId);
      if (!services || services.length === 0) {
        return notFoundResponse('NOT FOUND SERVICE');
      }
      return successResponse(services);
    } catch (error: any) {
      console.error('Error fetching services:', error.message || error);
      return internalServerErrorResponse('FAIL TO GET LIST SERVICE');
    }
  }