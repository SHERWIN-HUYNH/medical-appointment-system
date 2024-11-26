import prisma from '@/lib/prisma'
import { UserRole } from '@prisma/client'
export interface CreateUserDto {
  name: string
  email: string
  password: string
  phone: string
  roleName: string
}
export interface UserUpdate {
  name: string
  email: string
  password: string
  phone: string
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
        roleName: roleName as UserRole,
      },
    })
  }

  static async getUserByUserId(userId: string) {
    return await prisma.user.findFirst({ where: { id: userId } })
  }
  static async updateAccount(id: string, data: UserUpdate) {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      },
    })
    return user
  }
}
