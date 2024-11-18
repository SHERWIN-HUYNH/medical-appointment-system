import prisma from '@/lib/prisma';
import { Schedule } from '@/types/interface';

export class DoctorScheduleRespository {
  static async getDoctorSchedules(doctorId: string) {
    const doctorSchedules = await prisma.doctorSchedule.findMany({
      where: {
        doctorId: doctorId,
      },
      select: {
        isAvailable: true,
        schedule: true,
      },
      orderBy: {
        schedule: {
          date: 'asc',
        },
      },
    });
    if (!doctorSchedules) {
      throw new Error('No Doctor Schedule found');
    }
    return doctorSchedules;
  }

  static async deleteDoctorSchedule(doctorId: string, scheduleValue: Array<Schedule>) {
    try {
      for (const { date, timeSlot } of scheduleValue) {
        const existingDoctorSchedule = await prisma.doctorSchedule.findFirst({
          where: {
            doctorId,
            schedule: {
              date,
              timeSlot,
            },
          },
        });
        if (existingDoctorSchedule) {
          await prisma.doctorSchedule.delete({
            where: {
              id: existingDoctorSchedule.id,
            },
          });
        }
      }
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return false;
    }
  }

  static async saveSchedule(doctorId: string, schedules: Array<Schedule>) {
    return prisma.$transaction(async (tx) => {
      console.log('RESPO SCHEDULE', schedules);
      const datesToDelete = Array.from(
        new Set(schedules.map((schedule) => schedule.date)),
      );

      // Delete all doctor schedules for the doctor on the specified dates
      const deleteSchedules = await tx.doctorSchedule.deleteMany({
        where: {
          doctorId: doctorId,
          schedule: {
            date: {
              in: datesToDelete,
            },
          },
          isAvailable: true,
        },
      });
      if (!deleteSchedules) {
        throw new Error('Schedule is booked, can delete if not cancel');
      }
      const doctorSchedulePromises = schedules.map(async ({ date, timeSlot }) => {
        let schedule = await tx.schedule.findFirst({
          where: {
            date,
            timeSlot,
          },
        });

        if (!schedule) {
          schedule = await tx.schedule.create({
            data: { date, timeSlot },
          });
        }

        return tx.doctorSchedule.create({
          data: {
            doctorId: doctorId,
            scheduleId: schedule.id,
            isAvailable: true,
          },
        });
      });

      const doctorSchedules = await Promise.all(doctorSchedulePromises);

      return doctorSchedules;
    });
  }
  static async getDoctorScheduleById(scheduleId: string, doctorId: string) {
    if (!scheduleId || !doctorId) {
      throw new Error('Missing scheduleId or doctorId');
    }
    const doctorSchedule = await prisma.doctorSchedule.findFirst({
      where: {
        scheduleId: scheduleId,
        doctorId: doctorId,
      },
    });
    if (!doctorSchedule) {
      throw new Error('No Doctor Schedule found');
    }
    return doctorSchedule;
  }
  static async updateStateSchedule(id:string){
   
    const doctorSchedule = await prisma.doctorSchedule.update({
      where: {
        id: id
      },
      data: {
        isAvailable: false
      }
    });
    if (!doctorSchedule) {
      throw new Error('No Doctor Schedule found');
    }
    return doctorSchedule;
  }

}
