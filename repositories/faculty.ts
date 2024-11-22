import { Faculty, PrismaClient } from '@prisma/client'
import { DoctorRespository } from './doctor'
import { ServiceRepository } from './service'

const prisma = new PrismaClient()

export class FacultyRepository {
  static async getFacultyById(facultyId: string) {
    try {
      const faculty = await prisma.faculty.findUnique({
        where: {
          id: facultyId,
          isDeleted: false, // Chỉ lấy faculty chưa bị xóa
        },
      })
      await prisma.$disconnect()
      return faculty
    } catch (error) {
      await prisma.$disconnect()
      throw error
    }
  }

  static async getFaculties() {
    try {
      const faculties = await prisma.faculty.findMany({
        where: {
          isDeleted: false, // Chỉ lấy những faculty chưa bị xóa
        },
      })
      await prisma.$disconnect()
      return faculties
    } catch (error) {
      await prisma.$disconnect()
      throw error
    }
  }

  static async createFaculty(facultyData: Faculty) {
    const newFaculty = await prisma.faculty.create({
      data: {
        name: facultyData.name,
        description: facultyData.description,
        image: facultyData.image,
      },
    })
    await prisma.$disconnect()
    return newFaculty
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
    })
    await prisma.$disconnect()
    return updatedFaculty
  }

  static async deleteFaculty(facultyId: string) {
    try {
      if (!facultyId) {
        throw new Error('Faculty ID is undefined')
      }
      const services = await ServiceRepository.getServicesByFacultyId(facultyId)
      const doctors = await DoctorRespository.getDoctorsByFaculty(facultyId)

      return await prisma.$transaction(async (tx) => {
        for (const service of services) {
          await ServiceRepository.deleteService(service.id)
        }

        for (const doctor of doctors) {
          await DoctorRespository.deleteDoctor(doctor.id)
        }

        const deletedFaculty = await tx.faculty.update({
          where: { id: facultyId },
          data: { isDeleted: true },
        })

        return deletedFaculty
      })
    } catch (error) {
      console.error('Error deleting faculty:', error)
      throw error
    } finally {
      await prisma.$disconnect()
    }
  }

  static async checkFacultyExists(name: string) {
    try {
      const faculty = await prisma.faculty.findFirst({
        where: {
          name: {
            equals: name,
            mode: 'insensitive', // Tìm kiếm không phân biệt hoa thường
          },
          isDeleted: false,
        },
      })
      return faculty !== null
    } catch (error) {
      await prisma.$disconnect()
      throw error
    }
  }
}
