/* eslint-disable @typescript-eslint/no-explicit-any */
import { badRequestResponse, notFoundResponse, successResponse } from '@/helpers/response'
import { ServiceRepository } from '@/repositories/service'

export async function GET(req: Request, context: any) {
  const { facultyId } = context.params
  try {
    const services = await ServiceRepository.getServicesByFacultyId(facultyId)

    if (!services || services.length === 0) {
      return notFoundResponse('NOT FOUND SERVICE')
    }
    return successResponse(services)
  } catch (error) {
    console.error('Error fetching services:', error)
    return badRequestResponse('Failed to fetch services')
  }
}
