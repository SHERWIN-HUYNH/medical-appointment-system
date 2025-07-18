import { internalServerErrorResponse, successResponse } from '@/helpers/response'
import { sendMail } from '@/lib/send-email'
import { createAppointmentEmailContent } from '@/lib/email/successful-appointment'
import {
  SEND_EMAIL_FAIL,
  SEND_EMAIL_SUCCESS,
} from '@/validation/messageCode/commonMessageCode'
export async function POST() {
  try {
    sendMail({
      sendTo: 'n21dccn191@student.ptithcm.edu.vn',
      subject: 'Test email',
      text: 'This is a test email.',
      html: createAppointmentEmailContent(
        'Nguyen Van A',
        'Test',
        'Nguyen Van B',
        '2023-06-01',
        '10:00',
        '0123456789',
        'n21dccn191@student.ptithcm.edu.vn',
      ),
    })

    return successResponse(SEND_EMAIL_SUCCESS)
  } catch (error) {
    console.error('Error sending email:', error)
    return internalServerErrorResponse(SEND_EMAIL_FAIL)
  }
}
