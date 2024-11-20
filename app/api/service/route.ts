/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  badRequestResponse,
  forbiddenResponse,
  notFoundResponse,
  successResponse,
} from '@/helpers/response'
import { ServiceRepository } from '@/repositories/service'
import { Service } from '@/types/interface'

export async function GET() {
  const service = await ServiceRepository.getAllServices()
  if (!service) {
    return notFoundResponse('NOT FOUND SERVICE')
  }
  return successResponse(service)
}

export async function POST(req: Request) {
  const service: Service = await req.json()
  console.log('SERVICE', service)
  const newService = await ServiceRepository.createService(service)
  if (!newService) {
    return badRequestResponse('FAIL TO CREATE SERVICE')
  }
  return successResponse(newService)
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const deletedService = await ServiceRepository.deleteService(id);
    return successResponse(deletedService);
  } catch (error) {
    if (error instanceof Error) {
      return forbiddenResponse(error.message);
    }
    return badRequestResponse('Xóa dịch vụ thất bại');
  }
}
