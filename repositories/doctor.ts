import { AppointmentStatus, Doctor, PrismaClient, Schedule } from '@prisma/client'
import { getDayOfWeek } from '@/lib/utils'

const prisma = new PrismaClient()

interface DoctorWithSchedule extends Doctor {
  doctorSchedule: Array<{
    schedule: Schedule
  }>
}

interface DoctorWithScheduleDays extends Doctor {
  scheduleDays: string[]
}

export class DoctorRespository {
  static async createDoctor(doctorData: Doctor) {
    if (!doctorData) {
      throw new Error('Doctor data is missing.')
    }
    const newDoctor = await prisma.doctor.create({
      data: {
        name: doctorData.name,
        academicTitle: doctorData.academicTitle,
        image: doctorData.image,
        description: doctorData.description,
        facultyId: doctorData.facultyId,
        isActive: true,
        gender: doctorData.gender,
      },
    })
    await prisma.$disconnect()
    return newDoctor
  }

  static async getDoctores() {
    try {
      const doctors = await prisma.doctor.findMany({
        where: {
          isDeleted: false,
        },
        include: {
          faculty: true,
        },
      })
      await prisma.$disconnect()
      return doctors
    } catch (error) {
      await prisma.$disconnect()
      throw error
    }
  }

  static async getDoctorById(doctorId: string) {
    if (!doctorId) {
      throw new Error('Doctor ID is missing.')
    }

    const doctor = await prisma.doctor.findUnique({
      where: {
        id: doctorId,
      },
      include: {
        faculty: true,
      },
    })

    if (!doctor) {
      throw new Error('Doctor not found.')
    }

    await prisma.$disconnect()
    return doctor
  }

  static async updateDoctor(doctorId: string, doctorData: Doctor) {
    if (!doctorId) {
      throw new Error('Doctor ID is missing.')
    }

    if (!doctorData) {
      throw new Error('Doctor data is missing.')
    }

    const updatedDoctor = await prisma.doctor.update({
      where: {
        id: doctorId,
      },
      data: {
        name: doctorData.name,
        academicTitle: doctorData.academicTitle,
        image: doctorData.image,
        description: doctorData.description,
        facultyId: doctorData.facultyId,
        isActive: doctorData.isActive,
      },
    })

    await prisma.$disconnect()
    return updatedDoctor
  }

  static async getListDoctorsIsActive() {
    const doctors = await prisma.doctor.findMany({
      where: {
        isActive: true,
      },
      include: {
        faculty: {
          select: {
            name: true,
          },
        },
        comments: {
          select: {
            rating: true,
          },
        },
      },
    })

    const formattedDoctors = doctors.map((doctor) => {
      const totalRatings = doctor.comments.reduce(
        (sum, comment) => sum + comment.rating,
        0,
      )
      const averageRating =
        doctor.comments.length > 0 ? totalRatings / doctor.comments.length : 0

      return {
        id: doctor.id,
        name: doctor.name,
        facultyName: doctor.faculty?.name,
        rating: Number(averageRating.toFixed(1)),
        academicTitle: doctor.academicTitle,
        image: doctor.image,
        description: doctor.description,
      }
    })

    await prisma.$disconnect()
    return formattedDoctors
  }

  static async deleteDoctor(doctorId: string) {
    if (!doctorId) {
      throw new Error('Doctor ID is missing.')
    }

    const hasActiveAppointments = await this.hasAppointments(doctorId)
    if (hasActiveAppointments) {
      throw new Error('Bác sĩ đang có lịch hẹn không thể xóa')
    }

    const deletedDoctor = await prisma.doctor.update({
      where: {
        id: doctorId,
      },
      data: {
        isDeleted: true,
        isActive: false,
      },
    })

    await prisma.$disconnect()
    return deletedDoctor
  }

  static async hasAppointments(doctorId: string): Promise<boolean> {
    const doctorSchedule = await prisma.doctorSchedule.findFirst({
      where: {
        AND: [
          { doctorId: doctorId },
          {
            appointment: {
              status: {
                in: [AppointmentStatus.PENDING],
              },
            },
          },
        ],
      },
    })

    await prisma.$disconnect()
    return doctorSchedule !== null
  }

  static async getFacultyByDoctorId(doctorId: string) {
    try {
      const doctor = await prisma.doctor.findUnique({
        where: {
          id: doctorId,
        },
        include: {
          faculty: true,
        },
      })
      return doctor
    } catch (error) {
      throw new Error('Error getting faculty by doctor ID', error as Error)
    }
  }

  // Hàm private để xử lý và gom nhóm lịch làm việc theo ngày
  private static mapDoctorsWithScheduleDays(
    doctors: DoctorWithSchedule[],
  ): DoctorWithScheduleDays[] {
    return doctors.map((doctor) => {
      const daysByWeekday = new Map<string, string>()
      // Gom nhóm các lịch theo thứ trong tuần
      doctor.doctorSchedule.forEach((ds) => {
        const weekday = getDayOfWeek(ds.schedule.date)
        if (!daysByWeekday.has(weekday)) {
          daysByWeekday.set(weekday, ds.schedule.date)
        }
      })

      const uniqueDays = Array.from(daysByWeekday.values())
      return {
        ...doctor,
        scheduleDays: uniqueDays,
      }
    })
  }

  static async getDoctorsByFaculty(facultyId: string) {
    const doctors = await prisma.doctor.findMany({
      where: {
        facultyId: facultyId,
        isActive: true,
      },
      include: {
        faculty: true,
        doctorSchedule: {
          include: {
            schedule: true,
          },
          where: {
            isAvailable: true,
          },
        },
      },
    })

    const doctorsWithScheduleDays = this.mapDoctorsWithScheduleDays(doctors)
    await prisma.$disconnect()
    return doctorsWithScheduleDays
  }
}
