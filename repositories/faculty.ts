import { Faculty } from '@/types/interface';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class FacultyRepository {
  static async getFacultyById(facultyId: string) {
    try {
      const faculty = await prisma.faculty.findUnique({
        where: {
          id: facultyId,
        },
      });
      await prisma.$disconnect();
      return faculty;
    } catch (error) {
      await prisma.$disconnect();
      throw error;
    }
  }

  static async getFaculties() {
    try {
      const faculties = await prisma.faculty.findMany();
      await prisma.$disconnect();
      return faculties;
    } catch (error) {
      await prisma.$disconnect();
      throw error;
    }
  }

  static async createFaculty(facultyData: Faculty) {
    const newFaculty = await prisma.faculty.create({
      data: {
        name: facultyData.name,
        description: facultyData.description,
        image: facultyData.image,
      },
    });
    await prisma.$disconnect();
    return newFaculty;
  }

  static async updateFaculty(facultyData: Faculty, id: string) {
    const updatedFaculty = await prisma.faculty.update({
      where: {
        id: id,
      },
      data: {
        name: facultyData.name,
        description: facultyData.description,
        image: facultyData.image,
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
