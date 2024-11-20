<<<<<<< HEAD
/* eslint-disable @typescript-eslint/no-explicit-any */
=======
import Appointment from '@/app/patients/[userId]/new-appointment/page'
>>>>>>> 6e948221b114aee513d08b93da8de7337fcbaeb8
import {
  badRequestResponse,
  forbiddenResponse,
  notFoundResponse,
  successResponse,
} from '@/helpers/response'
import { AppointmentRepository } from '@/repositories/appointment'
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
  const { id } = await req.json()
  const appointment = await AppointmentRepository.getAppointmentByServiceId(id)
  console.log('Appointments found:', appointment)
  if (appointment?.length > 0) {
    return forbiddenResponse('Dịch vụ đang có lịch hẹn đang chờ xử lý')
  }
  const deletedService = await ServiceRepository.deleteService(id)
  if (!deletedService) {
    return badRequestResponse('Xóa dịch vụ thất bại')
  }
  return successResponse(deletedService)
}
