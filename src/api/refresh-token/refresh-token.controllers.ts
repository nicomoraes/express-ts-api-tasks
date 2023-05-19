import dayjs from 'dayjs';
import { type Response } from 'express';

import { type RefreshToken } from './refresh-token.model';
import * as service from './refresh-token.services';

import { type TypedRequestBody } from '@interfaces/request';

import { UnauthorizedError } from '@helpers/api-errors';
import { jwtGenerator } from '@helpers/jwt-generator';

export const refresh = async (
  req: TypedRequestBody<RefreshToken>,
  res: Response
) => {
  const storedRefreshToken = req.body;

  const retrievedRefreshToken = await service.getById({ id: storedRefreshToken.id });

  if (retrievedRefreshToken === null) {
    throw new UnauthorizedError('Refresh token inválido!');
  }

  const isRefreshTokenExpired = dayjs().isAfter(dayjs.unix(retrievedRefreshToken.expiresIn))

  const accessToken = jwtGenerator(retrievedRefreshToken.userId);

  if (isRefreshTokenExpired) {
    await service.removeByUserId({ userId: storedRefreshToken.userId });
    const newRefreshToken = await service.create({ userId: storedRefreshToken.userId });

    return res.status(200).json({ accessToken, refreshToken: newRefreshToken });
  }

  return res.status(200).json({ accessToken });
}
