import { z } from 'zod'
import { INPUT_REQUIRED } from './messageCode/authentication'


export const AddRoleSchema = z.object({
  name: z.string().min(1, { message: INPUT_REQUIRED }),
})

export const UpdateRoleWithPermissionsSchema = z.object({
  name: z.string().min(1, { message: INPUT_REQUIRED }),
  permissionIds: z.array(z.string()),
})

export type AddRoleInputs = z.infer<typeof AddRoleSchema>
