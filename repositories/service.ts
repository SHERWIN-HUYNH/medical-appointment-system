import { Service } from '@/types/interface'
import { PrismaClient } from '@prisma/client'
import { FacultyRepository } from './faculty'
import { AppointmentRepository } from './appointment'

const prisma = new PrismaClient()

export class ServiceRepository {
  static async getServicesById(serviceId: string) {
    try {
      const services = await prisma.service.findUnique({
        where: {
          id: serviceId,
          isDeleted: false,
        },
      })
      return services
    } catch (error) {
      console.error('Error retrieving services:', error)
      throw error
    } finally {
      await prisma.$disconnect()
    }
  }

  static async getServicesByFacultyId(facultyId: string) {
    try {
      const services = await prisma.service.findMany({
        where: {
          facultyId: facultyId,
          isDeleted: false,
        },
        include: {
          faculty: true,
        },
      })
      return services
    } catch (error) {
      console.error('Error retrieving services:', error)
      throw error
    } finally {
      await prisma.$disconnect()
    }
  }

  static async getAllServices() {
    try {
      const services = await prisma.service.findMany()
      return services
    } catch (error) {
      console.error('Error retrieving services:', error)
      throw error
    } finally {
      await prisma.$disconnect()
    }
  }

  static async checkServiceExists(name: string, facultyId: string) {
    try {
      const service = await prisma.service.findFirst({
        where: {
          name: name,
          facultyId: facultyId,
          isDeleted: false
        }
      });
      return service;
    } catch (error) {
      console.error('Error checking service:', error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  static async createService(serviceData: Service) {
    try {
      const faculty = await FacultyRepository.getFacultyById(serviceData.facultyId)
      if (!faculty) throw new Error('Faculty not found')
      
      // Kiểm tra service đã tồn tại
      const existingService = await this.checkServiceExists(serviceData.name, serviceData.facultyId);
      if (existingService) {
        throw new Error('Dịch vụ đã tồn tại trong chuyên khoa này');
      }

      const newService = await prisma.service.create({
        data: {
          name: serviceData.name,
          description: serviceData.description,
          price: serviceData.price,
          facultyId: faculty.id,
        },
      })
      return newService
    } catch (error) {
      console.error('Error creating service:', error)
      throw error
    } finally {
      await prisma.$disconnect()
    }
  }
  static async updateService(serviceData: Service) {
    const updatedService = await prisma.service.update({
      where: {
        id: serviceData.id,
      },
      data: serviceData,
    })
    return updatedService
  }
  static async deleteService(serviceId: string) {
    // Kiểm tra lịch hẹn pending bằng hàm getAppointmentByServiceId
    const pendingAppointments =
      await AppointmentRepository.getAppointmentByServiceId(serviceId)
    if (pendingAppointments.length > 0) {
      throw new Error('Dịch vụ đang có lịch hẹn đang chờ xử lý')
    }

    const result = await prisma.$transaction(async (tx) => {
      // Xóa tất cả appointments không phải PENDING
      await tx.appointment.deleteMany({
        where: {
          serviceId: serviceId,
          NOT: {
            status: 'PENDING',
          },
        },
      })

      // Soft delete service bằng cách cập nhật isDeleted = true
      const deletedService = await tx.service.update({
        where: {
          id: serviceId,
        },
        data: {
          isDeleted: true,
        },
      })
      return deletedService
    })

    await prisma.$disconnect()
    return result
  }
}
