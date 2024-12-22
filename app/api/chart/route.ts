import { badRequestResponse, notFoundResponse, successResponse } from '@/helpers/response'
import { ChartRepository } from '@/repositories/chart'
import {
  FAILED_GET_REPORT,
  REPORT_NOT_FOUND,
} from '@/validation/messageCode/apiMessageCode/chart'

export async function GET() {
  try {
    const appointments = await ChartRepository.getAppointmentsSummaryByFaculty()

    if (!appointments || appointments.length === 0) {
      return notFoundResponse(REPORT_NOT_FOUND)
    }

    return successResponse(appointments)
  } catch (error) {
    console.error('Error fetching appointments summary:', error)
    return badRequestResponse(FAILED_GET_REPORT)
  }
}
