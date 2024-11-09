import Appointment from '@/app/patients/[userId]/new-appointment/page';
import {
  badRequestResponse,
  forbiddenResponse,
  notFoundResponse,
  successResponse,
} from '@/helpers/response';
import { AppointmentRepository } from '@/repositories/appointment';
import { ServiceRepository } from '@/repositories/service';
import { Service } from '@/types/interface';

export async function GET() {
  const service = await ServiceRepository.getAllServices();
  if (!service) {
    return notFoundResponse('NOT FOUND SERVICE');
  }
  return successResponse(service);
}

export async function POST(req: Request) {
  const service: Service = await req.json();
  console.log('SERVICE', service);
  const newService = await ServiceRepository.createService(service);
  if (!newService) {
    return badRequestResponse('FAIL TO CREATE SERVICE');
  }
  return successResponse(newService);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  // const appointment = await AppointmentRepository.getAppointmentByServiceId(id);
  // if (appointment) {
  //     return forbiddenResponse("SERVICE HAS A PENDING APPOINTMENT");
  // }
  const deletedService = await ServiceRepository.deleteService(id);
  if (!deletedService) {
    return badRequestResponse('FAIL TO DELETE SERVICE');
  }
  return successResponse(deletedService);
}

export async function PUT(req: Request) {
  const service = await req.json();
  console.log('SERVICE DATA', service);
  // const appointment = await AppointmentRepository.getAppointmentByServiceId(service.id);
  // if (appointment) {
  //     return forbiddenResponse("SERVICE HAS A PENDING APPOINTMENT");
  // }

  const updatedService = await ServiceRepository.updateService(service);
  if (!updatedService) {
    return badRequestResponse('FAIL TO UPDATE SERVICE');
  }
  return successResponse(updatedService);
}
