import { type Response } from 'express';

import { type RefreshToken } from './refresh-token.model';
import * as service from './refresh-token.services';

import { type TypedRequestBody } from '@type/request';

export async function refresh (
  req: TypedRequestBody<RefreshToken>,
  res: Response
) {
  const refreshToken = req.body;

  const token = service.createTokenByRefreshToken(refreshToken.id);

  return res.status(200).json({ token });
}
