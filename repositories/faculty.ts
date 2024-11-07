import { Appointment, Faculty } from '@/types/interface';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export class FacultyRepository {
    static async createFaculty(facultyData: Faculty) {
        try {
            if (!facultyData) {
                throw new Error("Faculty name is missing");
              }
            const newFaculty = await prisma.faculty.create({
                data: {
                    name: facultyData.name,
                    description: facultyData.description,
                }               
            });
            return newFaculty;
        } catch (error) {
            console.error('Error creating faculty:', error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
        const newFaculty = await prisma.faculty.create({
            data: {
                name: facultyData.name,
                description: facultyData.description,
            }
        });
        await prisma.$disconnect();
        return newFaculty;
    }

    static async getFaculties() {
        const faculties = await prisma.faculty.findMany();
        await prisma.$disconnect();
        return faculties;
    }

    static async getFacultyById(facultyId: string) {
        try {
            const faculty = await prisma.faculty.findUnique({
                where: {
                    id: facultyId,
                },
            });
            if (!faculty) {
                throw new Error(`Faculty with ID ${facultyId} not found.`);
              }
            return faculty;
        } catch (error) {
            console.error('Error retrieving faculty:', error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }

    }

    static async updateFaculty(facultyData: Faculty, id: string) {
        const updatedFaculty = await prisma.faculty.update({
            where: {
                id: id,
            },
            data: {
                name: facultyData.name,
                description: facultyData.description,
            },
        });
        await prisma.$disconnect();
        return updatedFaculty;
    }

    static async deleteFaculty(facultyData: Faculty) {
        const deletedFaculty = await prisma.faculty.delete({
            where: {
                id: facultyData.id,
            },
        });
        await prisma.$disconnect();
        return deletedFaculty;
    }
}
