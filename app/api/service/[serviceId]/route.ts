import {
  badRequestResponse,
  forbiddenResponse,
  notFoundResponse,
  successResponse,
} from '@/helpers/response'
import { AppointmentRepository } from '@/repositories/appointment'
import { ServiceRepository } from '@/repositories/service'
import {
  FAILED_UPDATE_SERVICE,
  UPDATE_SERVICE_ACTIVE_APPOINTMENT,
} from '@/validation/messageCode/apiMessageCode/service'

export async function GET(req: Request, { params }: { params: { serviceId: string } }) {
  const { serviceId } = params

  if (!serviceId) {
    return badRequestResponse('MISSING SERVICE ID')
  }

  const service = await ServiceRepository.getServicesById(serviceId)
  if (!service) {
    return notFoundResponse('SERVICE NOT FOUND')
  }

  return successResponse(service)
}

export async function PUT(req: Request, { params }: { params: { serviceId: string } }) {
  const { serviceId } = params
  const serviceData = await req.json()

  const pendingAppointments =
    await AppointmentRepository.getAppointmentByServiceId(serviceId)
  if (pendingAppointments?.length > 0) {
    return forbiddenResponse(UPDATE_SERVICE_ACTIVE_APPOINTMENT)
  }

  const updateData = {
    id: serviceId,
    name: serviceData.name,
    description: serviceData.description,
    price: Number(serviceData.price.replace(/\D/g, '')),
    facultyId: serviceData.facultyId,
  }

  const updatedService = await ServiceRepository.updateService(updateData)
  if (!updatedService) {
    return badRequestResponse(FAILED_UPDATE_SERVICE)
  }

  return successResponse(updatedService)
}
