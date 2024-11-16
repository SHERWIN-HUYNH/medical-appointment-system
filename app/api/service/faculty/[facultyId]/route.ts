import { notFoundResponse, successResponse } from "@/helpers/response";
import { ServiceRepository } from "@/repositories/service";

export async function GET(req: Request,context: { params: { facultyId: string } }) {
  const { facultyId } = context.params;

  if (!facultyId) {
    return new Response(JSON.stringify({ error: "Faculty ID is required" }), { status: 400 });
  }

  try {
    const services = await ServiceRepository.getServicesByFacultyId(facultyId);
    if (!services || services.length === 0) {
      return notFoundResponse('NOT FOUND SERVICE');
    }
    return successResponse(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch services" }), { status: 500 });
  }
}
