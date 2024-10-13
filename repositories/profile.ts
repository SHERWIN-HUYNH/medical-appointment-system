import { Profile } from '@/types/interface';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export class ProfileRespository {
  static async getListProfileByUserId(userId: string) {
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

  static async getProfileById(id: string) {
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


  static async createProfile({profileData,userId}:{profileData:Profile,userId:string}) {
    try {
      const newProfile = await prisma.profile.create({
        data: {
          name: profileData.name,
          birthDate: profileData.birthday,
          gender: profileData.gender,
          phone:profileData.phone,
          email: profileData.email,
          identificationType: profileData.identificationType,
          identificationNumber: profileData.identificationNumber,
          identificationDocumentUrl: profileData.identificationDocumentUrl,
          pastMedicalHistory : profileData.pastMedicalHistory,
          userId: userId,
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
  static async updateProfile({profileData,userId}:{profileData:Profile,userId:string}) {
    try {
      const newProfile = await prisma.profile.update({
        where: {
          id: profileData.id,
        },
        data: {
          name: profileData.name,
          birthDate: profileData.birthday,
          gender: profileData.gender,
          phone:profileData.phone,
          email: profileData.email,
          identificationType: profileData.identificationType,
          identificationNumber: profileData.identificationNumber,
          identificationDocumentUrl: profileData.identificationDocumentUrl,
          pastMedicalHistory : profileData.pastMedicalHistory ,
          userId: userId,
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

  static async  deleteProfile({ profileData }: { profileData: Profile }) {
    try {
      const deletedProfile = await prisma.profile.delete({
        where: {
          id: profileData.id, 
        },
      });
  
      console.log("Hồ sơ đã bị xóa thành công:", deletedProfile);
      return deletedProfile; 
  
    } catch (error: any) {
      console.error("Lỗi xóa hồ sơ bệnh nhân:", error.message || error);
      throw new Error("Không thể xóa hồ sơ bệnh nhân. Vui lòng thử lại sau.");
    } finally {
      await prisma.$disconnect();
    }
  }
  
}
