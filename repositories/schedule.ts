import prisma from '@/lib/prisma'

export class ScheduleRespository {
  static async getScheduleByDateAndTime(date: string, timeSlot: string) {
    const schedule = await prisma.schedule.findFirst({
      where: {
        date,
        timeSlot,
      },
    })
    if (!schedule) {
      throw new Error('Schedule not found')
    }
    return schedule
  }
  static async getScheduleById(id: string) {
    const schedule = await prisma.schedule.findFirst({
      where: {
        id,
      },
    })
    if (!schedule) {
      throw new Error('Schedule not found')
    }
    return schedule
  }
}
