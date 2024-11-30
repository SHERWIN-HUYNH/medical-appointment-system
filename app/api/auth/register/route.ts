import { hashPassword } from '@/helpers/hash'
import {
  conflictResponse,
  createdResponse,
  internalServerErrorResponse,
} from '@/helpers/response'
import { createAccount } from '@/lib/email/createAccount'
import { sendMail } from '@/lib/send-email'
import { UserRepository } from '@/repositories/user'
import { RegisterUser } from '@/validation/register'
import { UserRole } from '@prisma/client'

export const POST = async (request: Request) => {
  try {
    const body = await request.json()
    const { username: name, email, password, phone } = RegisterUser.parse(body)
    const { role } = body.role ?? UserRole.USER
    const user = await UserRepository.getUserByEmail(email)
    if (!password) return conflictResponse('Password is required')
    if (user) {
      return conflictResponse('User already exists.')
    }
    const hashedPassword = await hashPassword(password)

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
