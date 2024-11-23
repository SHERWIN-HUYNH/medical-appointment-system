import { internalServerErrorResponse, successResponse } from '@/helpers/response'
import { BillRespository } from '@/repositories/bill'

interface Context {
  params: {
    userId: string
  }
}
export async function GET(req: Request, context: Context) {
  const { userId } = context.params
  if (!userId) return internalServerErrorResponse('UNAUTHENTICATED')
  try {
    const bills = await BillRespository.getAllBillsByUserId(userId)
    return successResponse(bills)
  } catch (error) {
    return internalServerErrorResponse(error as string)
  }
}
