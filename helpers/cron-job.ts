import cron from 'node-cron'
import { AppointmentStatus, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Cron job chạy mỗi ngày lúc 12:00 AM
const startCronJob = () => {
  cron.schedule('*/1 * * * *', async () => {
    const currentDate = new Date()
    try {
      const pendingAppointments = await prisma.appointment.findMany({
        where: { status: AppointmentStatus.PENDING },
        include: {
          doctorSchedule: {
            include: {
              schedule: true,
            },
          },
        },
      })
      const appointmentsToUpdate = pendingAppointments.filter((appointment) => {
        const scheduleDate = new Date(appointment.doctorSchedule.schedule.date)
        const timeSlot = appointment.doctorSchedule.schedule.timeSlot

        const [startTime] = timeSlot.split('-')
        const [startHour, startMinute] = startTime.split(':').map(Number)

        const scheduleStartDateTime = new Date(scheduleDate)
        scheduleStartDateTime.setHours(startHour, startMinute, 0, 0)

        return scheduleStartDateTime < currentDate
      })
      const updatedAppointments = await Promise.all(
        appointmentsToUpdate.map((appointment) =>
          prisma.appointment.update({
            where: { id: appointment.id },
            data: { status: AppointmentStatus.SCHEDULED },
          }),
        ),
      )
      console.log('RUNNING', updatedAppointments)
    } catch (error) {
      console.error('Error updating statuses:', error)
    }
  })
}

export default startCronJob
