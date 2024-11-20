import prisma from '@/lib/prisma'
import { UserRole } from '@prisma/client'
export interface CreateUserDto {
  name: string
  email: string
  password: string
  phone: string
  roleName: string
}
export class UserRepository {
  static async getUserByEmail(email: string) {
    return await prisma.user.findFirst({ where: { email } })
  }
  static async insert({ name, email, password, phone, roleName }: CreateUserDto) {
    return prisma.user.create({
      data: {
        name,
        email,
        password,
        phone,
        roleName: UserRole.USER,
      },
    })
  }

  static async getUserByUserId(userId: string) {
    return await prisma.user.findFirst({ where: { id: userId } })
  }
}
