import { hashPassword } from '@/helpers/hash'
import {
  conflictResponse,
  createdResponse,
  internalServerErrorResponse,
} from '@/helpers/response'
import { createAccount } from '@/lib/email/createAccount'
import { sendMail } from '@/lib/send-email'
import { UserRepository } from '@/repositories/user'
import { RegisterSchema } from '@/validation/register'
import { UserRole } from '@prisma/client'

export const POST = async (request: Request) => {
  try {
    const body = await request.json()
    console.log('BODY', body)
    const { username: name, email, password, phone, role } = RegisterSchema.parse(body)

    const user = await UserRepository.getUserByEmail(email)
    if (user) {
      return conflictResponse('User already exists.')
    }
    const hashedPassword = await hashPassword(password)
    console.log('ROLE', role)
    const account = await UserRepository.insert({
      name,
      email,
      password: hashedPassword,
      phone,
      roleName: role ?? UserRole.USER,
    })
    if (account) {
      if (role == UserRole.ADMIN || role == UserRole.DOCTOR) {
        sendMail({
          sendTo: account?.email,
          subject: 'Tạo mật khẩu thành công',
          text: '',
          html: createAccount(
            email,
            password,
            name,
            'http://localhost:3000/auth/reset-password',
          ),
        })
      }
    }
    return createdResponse({
      message: 'User created successfully.',
    })
  } catch (error) {
    if (error instanceof Error) {
      return internalServerErrorResponse(error.message)
    }
  }
}
