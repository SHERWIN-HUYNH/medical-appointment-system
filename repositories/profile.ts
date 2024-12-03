import { Profile } from '@/types/interface'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class ProfileRespository {
  static async getListProfileByUserId(userId: string) {
    try {
      const profiles = await prisma.profile.findMany({
        where: {
          userId: userId,
          isDeleted: false,
        },
      })
      return profiles
    } catch (error) {
      throw error
    } finally {
      await prisma.$disconnect()
    }
  }

  static async getProfileById(id: string) {
    try {
      const profile = await prisma.profile.findUnique({
        where: {
          id: id,
        },
      })
      return profile
    } catch (error) {
      throw error
    } finally {
      await prisma.$disconnect()
    }
  }

  static async getListProfileNoAppoinmentByUserId(userId: string) {
    try {
      const profiles = await prisma.profile.findMany({
        where: {
          userId: userId,
          isDeleted: false,
          appointments: {
            none: {
              status: 'PENDING',
            },
          },
        },
      })
      return profiles
    } catch (error) {
      throw error
    } finally {
      await prisma.$disconnect()
    }
  }

  static async createProfile({
    profileData,
    userId,
  }: {
    profileData: Profile
    userId: string
  }) {
    try {
      const newProfile = await prisma.profile.create({
        data: {
          name: profileData.name,
          birthDate: profileData.birthDate,
          gender: profileData.gender,
          phone: profileData.phone,
          email: profileData.email,
          symptom: profileData.symptom,
          identificationType: profileData.identificationType,
          identificationNumber: profileData.identificationNumber,
          identificationDocumentUrl: profileData.identificationDocumentUrl,
          pastMedicalHistory: profileData.pastMedicalHistory,
          userId: userId,
        },
      })
      return newProfile
    } catch (error) {
      throw error
    } finally {
      await prisma.$disconnect()
    }
  }
  static async updateProfile({
    profileData,
    userId,
  }: {
    profileData: Profile
    userId: string
  }) {
    try {
      const newProfile = await prisma.profile.update({
        where: {
          id: profileData.id,
        },
        data: {
          name: profileData.name,
          birthDate: profileData.birthDate,
          gender: profileData.gender,
          phone: profileData.phone,
          email: profileData.email,
          symptom: profileData.symptom,
          identificationType: profileData.identificationType,
          identificationNumber: profileData.identificationNumber,
          identificationDocumentUrl: profileData.identificationDocumentUrl,
          pastMedicalHistory: profileData.pastMedicalHistory,
          userId: userId,
        },
      })
      return newProfile
    } catch (error) {
      throw error
    } finally {
      await prisma.$disconnect()
    }
  }

  static async deleteProfile({ profileData }: { profileData: Profile }) {
    try {
      const hasPending = await this.hasPendingAppointments(profileData.id)

      if (hasPending) {
        throw new Error('Không thể xóa hồ sơ, hồ sơ này đang có lịch hẹn.')
      }
      const deletedProfile = await prisma.profile.update({
        where: {
          id: profileData.id,
        },
        data: {
          isDeleted: true,
        },
      })
      return deletedProfile
    } catch (error) {
      throw error
    } finally {
      await prisma.$disconnect()
    }
  }

  static async hasPendingAppointments(profileId: string): Promise<boolean> {
    const pendingAppointment = await prisma.appointment.findFirst({
      where: {
        profileId,
        status: 'PENDING',
      },
    })
    return !!pendingAppointment
  }
}
