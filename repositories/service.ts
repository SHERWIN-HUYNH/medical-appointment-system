import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export  class ServiceRepository {
    static async getServicesById(serviceId: string) {
        try {
            const services = await prisma.service.findUnique({
                where: {
                    id: serviceId
                }
            });
            return services;
        } catch (error) {
            console.error('Error retrieving services:', error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }
}