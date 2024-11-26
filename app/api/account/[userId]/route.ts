import { hashPassword } from '@/helpers/hash'
import {
  conflictResponse,
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
} from '@/helpers/response'
import { UserRepository } from '@/repositories/user'
import { UpdateAccountValidation } from '@/validation/updateAccount'
import { compare } from 'bcrypt'
interface Context {
  params: {
    userId: string
  }
}
export async function PUT(req: Request, context: Context) {
  const { userId } = context.params
  if (!userId) return internalServerErrorResponse('Yêu cầu đăng nhập')
  const body = await req.json()
  console.log(body)
  const { username, email, oldPassword, newPassword, phone } =
    UpdateAccountValidation.parse(body)

  const oldAccount = await UserRepository.getUserByUserId(userId)
  if (!oldAccount) return notFoundResponse('Không tin thấy tài khoản')

  const isPasswordCorrect = await compare(oldPassword, oldAccount.password)
  if (isPasswordCorrect) {
    const hashedPassword = await hashPassword(newPassword)
    const user = await UserRepository.getUserByEmail(email)

    if (user && user.id !== userId) {
      return conflictResponse('Email này đã được sử dụng.')
    }
    console.log('CORRECT PASSWORD')
    try {
      const update = await UserRepository.updateAccount(userId, {
        name: username,
        email,
        password: hashedPassword,
        phone,
      })
      console.log('UPDATE', update)
      return successResponse(update)
    } catch (error) {
      console.log(error)
      return internalServerErrorResponse(error as string)
    }
  } else {
    return internalServerErrorResponse('Mật khẩu không chính xác')
  }
}
export async function GET(req: Request, context: Context) {
  const { userId } = context.params
  if (!userId) return internalServerErrorResponse('UNAUTHENTICATED')
  try {
    const user = await UserRepository.getUserByUserId(userId)
    return successResponse(user)
  } catch (error) {
    return internalServerErrorResponse(error as string)
  }
}
