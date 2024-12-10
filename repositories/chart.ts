import { PrismaClient, AppointmentStatus } from '@prisma/client'

const prisma = new PrismaClient()
type GroupedData = {
  [key: string]: {
    year: number;
    month: number;
    totalAppointments: number;
    totalAmount: number;
    appointments: {
      id: string;
      date: string;
      price: number;
      serviceName: string;
      facultyName: string;
    }[];
  };
};

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
          payments: { status: 'COMPLETED' },
        },
        include: {
          Service: {
            select: {
              id: true,
              name: true,
              faculty: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          doctorSchedule: {
            select: {
              schedule: {
                select: { date: true },
              },
            },
          },
          payments: {
            select: { price: true },
          },
        },
      });

      const groupedData: GroupedData = appointments.reduce<GroupedData>((acc, appointment) => {
        const scheduleDate = appointment.doctorSchedule?.schedule?.date;
        if (!scheduleDate) return acc;

        const date = new Date(scheduleDate);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const key = `${year}-${month}`;

        if (!acc[key]) {
          acc[key] = {
            year,
            month,
            totalAmount: 0,
            totalAppointments: 0,
            appointments: [],
          };
        }

        const paymentPrice = appointment.payments?.price || 0;

        acc[key].totalAmount += paymentPrice;
        acc[key].totalAppointments += 1;
        acc[key].appointments.push({
          id: appointment.id,
          date: scheduleDate,
          price: paymentPrice,
          serviceName: appointment.Service?.name || 'Unknown',
          facultyName: appointment.Service?.faculty?.name || 'Unknown',
        });

        return acc;
      }, {} as GroupedData);
      return Object.values(groupedData);
    } catch (error) {
      console.error('Error fetching appointments by date:', error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
}  