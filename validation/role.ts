import { z } from 'zod'

export const AddRoleSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
})

export const UpdateRoleWithPermissionsSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  permissionIds: z.array(z.string()),
})

export type AddRoleInputs = z.infer<typeof AddRoleSchema>
