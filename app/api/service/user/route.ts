import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
} from '@/helpers/response'
import { ServiceRepository } from '@/repositories/service'

export async function GET() {
  try {
    const services = await ServiceRepository.getServicesIsActive()
    if (!services || services.length === 0) {
      return notFoundResponse('NOT FOUND SERVICE')
    }
    return successResponse(services)
  } catch (error: unknown) {
    console.error(
      'Error fetching services:',
      error instanceof Error ? error.message : error,
    )
    return internalServerErrorResponse('FAIL TO GET SERVICES')
  }
}
