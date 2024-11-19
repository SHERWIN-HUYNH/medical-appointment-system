import { Service } from '@/types/interface';
import { PrismaClient } from '@prisma/client';
import { FacultyRepository } from './faculty';

const prisma = new PrismaClient();

export class ServiceRepository {
  static async getServicesById(serviceId: string) {
    try {
      const services = await prisma.service.findUnique({
        where: {
          id: serviceId,
        },
      });
      return services;
    } catch (error) {
      console.error('Error retrieving services:', error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  static async getServicesByFacultyId(facultyId: string) {
    try {
      const services = await prisma.service.findMany({
        where: {
          facultyId: facultyId,
        },
        include: {
          faculty: true,
        },
      });
      return services;
    } catch (error) {
      console.error('Error retrieving services:', error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  static async getAllServices() {
    try {
      const services = await prisma.service.findMany();
      return services;
    } catch (error) {
      console.error('Error retrieving services:', error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
  static async createService(serviceData: Service) {
    try {
      const faculty = await FacultyRepository.getFacultyById(serviceData.facultyId);
      if (!faculty) throw new Error('Faculty not found');
      const newService = await prisma.service.create({
        data: {
          name: serviceData.name,
          description: serviceData.description,
          price: serviceData.price,
          facultyId: faculty.id,
        },
      });
      return newService;
    } catch (error) {
      console.error('Error creating service:', error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
  static async updateService(serviceData: Service) {
    try {
      const updatedService = await prisma.service.update({
        where: {
          id: serviceData.id,
        },
        data: serviceData,
      });
      return updatedService;
    } catch (error) {
      console.error('Error updating service:', error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
  static async deleteService(serviceId: string) {
    try {
      const deletedService = await prisma.service.delete({
        where: {
          id: serviceId,
        },
      });
      return deletedService;
    } catch (error) {
      console.error('Error deleting service:', error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
}
