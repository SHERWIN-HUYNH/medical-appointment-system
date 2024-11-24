import { PrismaClient, AppointmentStatus } from '@prisma/client'

const prisma = new PrismaClient()

type GroupedData = {
  [key: string]: {
    year: number
    month: number
    totalAppointments: number
    totalAmount: number
    appointments: {
      id: string
      date: string
      price: number
    }[]
  }
}

export class ChartRepository {
  static async getAppointmentsSummaryByFaculty() {
    try {
      const appointments = await prisma.appointment.findMany({
        where: {
          status: {
            in: [AppointmentStatus.SCHEDULED],
          },
        },
        select: {
          status: true,
          Service: {
            select: {
              price: true,
              faculty: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      })

      const totalAppointments = appointments.length
      if (totalAppointments === 0) {
        console.warn('Không có lịch hẹn nào thỏa mãn điều kiện.')
        return []
      }

      const facultySummary: Record<
        string,
        {
          facultyName: string
          sumAppointmentsFaculty: number
          revenue: number
        }
      > = {}

      appointments.forEach((appointment) => {
        if (!appointment.Service?.faculty) {
          console.warn(
            'Dữ liệu lịch hẹn thiếu thông tin Service hoặc faculty:',
            appointment,
          )
          return
        }

        const facultyId = appointment.Service.faculty.id
        const facultyName = appointment.Service.faculty.name
        const price = appointment.Service.price || 0
        const status = appointment.status

        if (!facultySummary[facultyId]) {
          facultySummary[facultyId] = {
            facultyName,
            sumAppointmentsFaculty: 0,
            revenue: 0,
          }
        }
        facultySummary[facultyId].sumAppointmentsFaculty += 1
        if (status === AppointmentStatus.SCHEDULED) {
          facultySummary[facultyId].revenue += price
        }
      })

      const chart = Object.entries(facultySummary).map(([facultyId, summary]) => ({
        facultyId,
        facultyName: summary.facultyName,
        sumAppointmentsFaculty: summary.sumAppointmentsFaculty,
        completionRate: totalAppointments
          ? parseFloat(
              ((summary.sumAppointmentsFaculty / totalAppointments) * 100).toFixed(2),
            )
          : 0,
        revenue: parseFloat(summary.revenue.toFixed(2)),
      }))

      return chart
    } catch (error) {
      console.error('Lỗi khi truy xuất thông tin lịch hẹn theo chuyên khoa: ', error)
      throw error
    } finally {
      await prisma.$disconnect()
    }
  }

  static async getAppointmentByDate() {
    try {
      const appointments = await prisma.appointment.findMany({
        where: {
          status: 'SCHEDULED',
          payments: {
            status: 'COMPLETED',
          },
        },
        include: {
          doctorSchedule: {
            include: {
              schedule: {
                select: {
                  date: true,
                },
              },
            },
          },
          payments: {
            select: {
              price: true,
            },
          },
        },
      })

      const groupedData = appointments.reduce<GroupedData>((acc, appointment) => {
        const date = new Date(appointment.doctorSchedule.schedule.date)
        const year = date.getFullYear()
        const month = date.getMonth() + 1

        const key = `${year}-${month}`
        if (!acc[key]) {
          acc[key] = {
            year,
            month,
            totalAmount: 0,
            totalAppointments: 0,
            appointments: [],
          }
        }

        acc[key].totalAmount += appointment.payments?.price || 0
        acc[key].totalAppointments += 1
        acc[key].appointments.push({
          id: appointment.id,
          date: appointment.doctorSchedule.schedule.date,
          price: appointment.payments?.price || 0,
        })

        return acc
      }, {})

      const result = Object.values(groupedData)

      return result
    } catch (error) {
      console.error('Error retrieving and grouping appointments:', error)
      throw error
    } finally {
      await prisma.$disconnect()
    }
  }
}
