import { Faculty } from '@/types/interface'
import { PrismaClient } from '@prisma/client'
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

  static async deleteFaculty(facultyData: Faculty) {
    // 1. Lấy danh sách services của faculty sử dụng getServicesByFacultyId
    const services = await ServiceRepository.getServicesByFacultyId(facultyData.id)

    // 2. Lấy danh sách bác sĩ của chuyên khoa
    const doctors = await DoctorRespository.getDoctorsByFaculty(facultyData.id)

    // 3. Tiến hành xóa
    return await prisma.$transaction(async (tx) => {
      // Xóa từng service sử dụng hàm deleteService
      for (const service of services) {
        await ServiceRepository.deleteService(service.id)
      }

      // Xóa từng bác sĩ
      for (const doctor of doctors) {
        await DoctorRespository.deleteDoctor(doctor.id)
      }

      // Nếu xóa tất cả thành công, cập nhật trạng thái faculty
      const deletedFaculty = await tx.faculty.update({
        where: { id: facultyData.id },
        data: { isDeleted: true },
      })

      return deletedFaculty
    })
  }
}
