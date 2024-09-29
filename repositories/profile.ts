import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ProfileService {
  static async getListProfileByUserId(userId: number) {
    try {
      const profiles = await prisma.profile.findMany({
        where: {
          userId: userId, 
        },
      });
      return profiles; 
    } catch (error) {
      console.error("Lỗi khi truy xuất hồ sơ bệnh nhân: ", error);
      throw error;
    } finally {
      await prisma.$disconnect(); 
    }
  }

  static async getProfileById(id: number) {
    try {
      const profile = await prisma.profile.findUnique({ 
        where: {
          id: id, 
        },
      });
      return profile; 
    } catch (error) {
      console.error("Lỗi khi truy xuất hồ sơ bệnh nhân: ", error);
      throw error;
    } finally {
      await prisma.$disconnect(); 
    }
  }

  static async createProfile(profileData: {
    id: number; 
    name: string;
    birthday: Date; // Hoặc string tùy theo định dạng bạn sử dụng
    gender: 'MALE' | 'FEMALE' | 'OTHER';
    email: string;
    identificationType: string;
    identificationNumber: string;
    identificationDocumentUrl: string; // Hoặc URL kiểu string
    pastMedicalHistory : string; // Hoặc một kiểu dữ liệu khác nếu cần
    userId: number;
  }) {
    try {
      const newProfile = await prisma.profile.create({
        data: {
          id: profileData.id,
          name: profileData.name,
          birthDate: profileData.birthday,
          gender: profileData.gender,
          email: profileData.email,
          identificationType: profileData.identificationType,
          identificationNumber: profileData.identificationNumber,
          identificationDocumentUrl: profileData.identificationDocumentUrl,
          pastMedicalHistory : profileData.pastMedicalHistory ,
          userId: profileData.userId,
        },
      });
      return newProfile; 
    } catch (error) {
      console.error("Lỗi khi thêm hồ sơ bệnh nhân: ", error);
      throw error;
    } finally {
      await prisma.$disconnect(); 
    }
  }
}
