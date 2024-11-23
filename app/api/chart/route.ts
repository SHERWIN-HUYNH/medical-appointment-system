import { badRequestResponse, notFoundResponse, successResponse } from '@/helpers/response'
import { ChartRepository } from '@/repositories/chart'

export async function GET() {
  const appointments = await ChartRepository.getAppointmentsSummaryByFaculty()
  if (!appointments || appointments.length === 0) {
    return notFoundResponse('NOT FOUND PROFILE')
  }
  if (appointments) {
    console.log('Dữ liệu trả về:', appointments)
    return successResponse('GET REPORT SUCCESSFULLY')
  } else {
    return badRequestResponse('FAIL TO GET REPORT')
  }
}
