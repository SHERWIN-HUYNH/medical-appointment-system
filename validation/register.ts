import { z } from 'zod'

export const RegisterSchema = z
  .object({
    username: z.string().min(2, 'Tên phải ít nhất 6 kí tự'),
    email: z.string().email('Email không hợp lệ'),
    password: z.string().min(6, 'Mật khẩu phải chứa 6 kí tự'),
    phone: z
      .string()
      .min(10, 'Số điện thoại phải có ít nhất 10 chữ số')
      .max(11, 'Số điện thoại không quá 11 chữ số'),
    passwordConfirm: z.string().min(6, {}),
    role: z.enum(['ADMIN', 'DOCTOR'], {
      required_error: 'Vui lòng chọn quyền người dùng',
    }).optional(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Mật khẩu không trùng khớp',
    path: ['passwordConfirm'],
  })
  export const RegisterUser = z
  .object({
    username: z.string().min(2, 'Tên phải ít nhất 6 kí tự'),
    email: z.string().email('Email không hợp lệ'),
    password: z.string().min(6, 'Mật khẩu phải chứa 6 kí tự').optional(),
    phone: z
      .string()
      .min(10, 'Số điện thoại phải có ít nhất 10 chữ số')
      .max(11, 'Số điện thoại không quá 11 chữ số'),
  })
  export const RegisterUser2 = z
  .object({
    username: z.string().min(2, 'Tên phải ít nhất 6 kí tự'),
    email: z.string().email('Email không hợp lệ'),
    phone: z
      .string()
      .min(10, 'Số điện thoại phải có ít nhất 10 chữ số')
      .max(11, 'Số điện thoại không quá 11 chữ số'),
  })

