import * as jwt from 'jsonwebtoken'
import {ApplicationContext} from "../globalInterfaces";

interface DecodedJWTToken {
  userId: string
  iat: number
  exp: number
}

export const authGuard = async (guardedFunction: (...params) => void | Promise<any>, context: ApplicationContext) => {
  const { prisma } = context
  const token = context.cookies.get('token')

  if (!token) {
    throw new Error('Authenticate first')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as unknown as DecodedJWTToken

    if (!decoded || !decoded.userId) {
      throw new Error('Authenticate first')
    }

    const user = await prisma.user.count({
      where: {
        id: decoded.userId
      }
    })

    if (!user) {
      throw new Error('Authenticate first')
    }

    return guardedFunction
  } catch {
    throw new Error('Authenticate first')
  }
}
