import { PrismaClient, AppointmentStatus } from '@prisma/client'

const prisma = new PrismaClient()

export class ChartRepository {
  static async getAppointmentsSummaryByFaculty() {
    try {
      const appointments = await prisma.appointment.findMany({
        where: {
          status: {
            in: [AppointmentStatus.SCHEDULED, AppointmentStatus.PENDING],
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
        // completionRate: totalAppointments
        //   ? parseFloat(
        //       ((summary.sumAppointmentsFaculty/ totalAppointments) * 100).toFixed(2),
        //     )
        //   : 0,
        // revenue: parseFloat(summary.revenue.toFixed(2)),
      }))

      return chart
    } catch (error) {
      console.error('Lỗi khi truy xuất thông tin lịch hẹn theo chuyên khoa: ', error)
      throw error
    } finally {
      await prisma.$disconnect()
    }
  }
}
