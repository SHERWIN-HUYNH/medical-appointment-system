import { AppointmentStatus, Doctor, PrismaClient } from '@prisma/client';
import { getDayOfWeek } from '@/lib/utils';

const prisma = new PrismaClient();

export class DoctorRespository {
  static async createDoctor(doctorData: Doctor) {
    if (!doctorData) {
      throw new Error('Doctor data is missing.');
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
    });
    await prisma.$disconnect();
    return newDoctor;
  }

  static async getDoctores() {
    const doctors = await prisma.doctor.findMany({
      where: {
        isDeleted: false,
      },
    });
    await prisma.$disconnect();
    return doctors;
  }

  static async getDoctorById(doctorId: string) {
    const doctor = await prisma.doctor.findUnique({
      where: {
        id: doctorId,
      },
    });
    await prisma.$disconnect();
    return doctor;
  }

  static async updateDoctor(doctorId: string, doctorData: Doctor) {
    if (!doctorId) {
      throw new Error('Doctor ID is missing.');
    }

    if (!doctorData) {
      throw new Error('Doctor data is missing.');
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
    });

    await prisma.$disconnect();
    return updatedDoctor;
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
      },
    });

    const formattedDoctors = doctors.map((doctor) => ({
      ...doctor,
      facultyName: doctor.faculty?.name,
    }));
    await prisma.$disconnect();
    return formattedDoctors;
  }
  static async deleteDoctor(doctorId: string) {
    if (!doctorId) {
      throw new Error('Doctor ID is missing.');
    }

    const hasActiveAppointments = await this.hasAppointments(doctorId);
    if (hasActiveAppointments) {
      throw new Error('Bác sĩ đang có lịch hẹn không thể xóa');
    }

    const deletedDoctor = await prisma.doctor.update({
      where: {
        id: doctorId,
      },
      data: {
        isDeleted: true,
        isActive: false,
      },
    });

    await prisma.$disconnect();
    return deletedDoctor;
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
    });

    await prisma.$disconnect();
    return doctorSchedule !== null;
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
      });
      return doctor;
    } catch (error) {
      throw new Error('Error getting faculty by doctor ID', error as Error);
    }
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
    });

    // Gom nhóm các lịch theo thứ trong tuần
    const doctorsWithScheduleDays = doctors.map((doctor) => {
      // Tạo Map để lưu trữ ngày đại diện cho mỗi thứ trong tuần
      const daysByWeekday = new Map<string, string>();

      doctor.doctorSchedule.forEach((ds) => {
        const weekday = getDayOfWeek(ds.schedule.date);
        // Nếu thứ này chưa có trong Map, thêm vào với ngày đầu tiên gặp
        if (!daysByWeekday.has(weekday)) {
          daysByWeekday.set(weekday, ds.schedule.date);
        }
      });

      // Chuyển Map thành mảng các ngày đại diện
      const uniqueDays = Array.from(daysByWeekday.values());

      return {
        ...doctor,
        scheduleDays: uniqueDays,
      };
    });
    await prisma.$disconnect();
    return doctorsWithScheduleDays;
  }
}
