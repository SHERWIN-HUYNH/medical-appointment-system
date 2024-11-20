import { Appointment, CreateAppointment } from '@/types/interface'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class AppointmentRepository {
  static async getAppointmentByUserId(profileId: string) {
    try {
      const appointments = await prisma.appointment.findMany({
        where: {
          profileId: profileId,
        },
      })
      return appointments
    } catch (error) {
      console.error('Error retrieving appointments:', error)
      throw error
    } finally {
      await prisma.$disconnect()
    }
  }
  static async getAppointmentByServiceId(serviceId: string) {
    try {
      const appointments = await prisma.appointment.findMany({
        where: {
          status: 'PENDING',
          Service: {
            id: serviceId,
          },
        },
      })
      return appointments
    } catch (error) {
      console.error('Error retrieving appointments:', error)
      throw error
    } finally {
      await prisma.$disconnect()
    }
  }

  static async createAppointment({
    doctorScheduleId,
    serviceId,
    profileId,
  }: CreateAppointment) {
    try {
      const newAppointment = await prisma.appointment.create({
        data: {
          doctorScheduleId,
          serviceId,
          profileId,
        },
      })
      return newAppointment
    } catch (error) {
      console.error('Error creating appointment:', error)
      throw error
    } finally {
      await prisma.$disconnect()
    }
  }
  static async getAllAppointments() {
    try {
      const appointments = await prisma.appointment.findMany({
        include: {
          profile: true,
          doctorSchedule: {
            include: {
              schedule: true,
              doctor: true,
            },
          },
        },
      })
      return appointments
    } catch (error) {
      console.error('Error retrieving appointments:', error)
      throw error
    } finally {
      await prisma.$disconnect()
    }
  }
  static async CountAppointment() {
    try {
      const appointmentCounts = await prisma.appointment.groupBy({
        by: ['status'],
        _count: {
          id: true,
        },
      })
      const result = appointmentCounts.map((group) => ({
        status: group.status,
        count: group._count.id,
      }))
      return result
    } catch (error) {
      console.error('Error retrieving appointments:', error)
      throw error
    } finally {
      await prisma.$disconnect()
    }
  }
}
