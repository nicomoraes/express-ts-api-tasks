import { type NextFunction, type Request, type Response } from 'express'
import { type JwtPayload, verify } from 'jsonwebtoken'

import { UnauthorizedError } from '@helpers/api-errors'

import * as userService from '@api/users/user.services'

export const jwtValidator = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers

  if (authorization == null) {
    throw new UnauthorizedError('Token inválido!')
  }

  const parts = authorization.split(' ')

  if (parts.length !== 2) {
    throw new UnauthorizedError('Token inválido!')
  }

  const [type, token] = parts

  if (type !== 'Bearer') {
    throw new UnauthorizedError('Token inválido!')
  }

  try {
    const payload = verify(token, process.env.JWT_PRIVATE_KEY!) as JwtPayload

    const user = await userService.getById({ id: payload.sub })

    if ((user == null) || (user.id.length === 0)) {
      throw new UnauthorizedError('Token inválido!')
    }

    req.body.userId = user.id
  } catch (error) {
    throw new UnauthorizedError('Token inválido!')
  }

  next()
}
