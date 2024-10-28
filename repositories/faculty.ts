import { Appointment, Faculty } from '@/types/interface';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export class FacultyRepository {
    static async createFaculty(facultyData: Faculty) {
        if (!facultyData) {
            throw new Error("Faculty name is missing");
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
        const faculty = await prisma.faculty.findUnique({
            where: {
                id: facultyId,
            },
        });
        await prisma.$disconnect();
        return faculty;
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
