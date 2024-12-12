/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  badRequestResponse,
  forbiddenResponse,
  notFoundResponse,
  successResponse,
  conflictResponse,
} from '@/helpers/response'
import { ServiceRepository } from '@/repositories/service'
import { Service } from '@/types/interface'
import {
  FAILED_ADD_SERVICE,
  FAILED_DELETE_SERVICE,
  SERVICE_EXISTS,
} from '@/validation/messageCode/apiMessageCode/service'

export async function GET() {
  const service = await ServiceRepository.getAllServices()
  if (!service) {
    return notFoundResponse('NOT FOUND SERVICE')
  }
  return successResponse(service)
}

export async function POST(req: Request) {
  try {
    const service: Service = await req.json()
    if (!service) {
      return badRequestResponse('MISSING SERVICE DATA')
    }
    const exists = await ServiceRepository.checkServiceExists(
      service.name,
      service.facultyId,
    )

    if (exists) {
      return conflictResponse(SERVICE_EXISTS)
    }
    const newService = await ServiceRepository.createService(service)
    return successResponse(newService)
  } catch (error) {
    console.log(error)
    return badRequestResponse(FAILED_ADD_SERVICE)
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()
    const deletedService = await ServiceRepository.deleteService(id)
    return successResponse(deletedService)
  } catch (error) {
    if (error instanceof Error) {
      return forbiddenResponse(error.message)
    }
    return badRequestResponse(FAILED_DELETE_SERVICE)
  }
}
