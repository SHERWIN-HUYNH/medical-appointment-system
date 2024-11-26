import { internalServerErrorResponse, successResponse } from '@/helpers/response'
import { sendMail } from '@/lib/send-email'
import { createAppointmentEmailContent } from '@/lib/email/successful-appointment'
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

    return successResponse('Email sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
    return internalServerErrorResponse('Error sending email')
  }
}
