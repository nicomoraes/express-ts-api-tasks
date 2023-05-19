import bcrypt from 'bcrypt'
import { type Response } from 'express'

import * as refreshTokenService from '../refresh-token/refresh-token.services'
import { type UserAuthentication } from './user.model'
import * as services from './user.services'

import { type TypedRequestBody } from '@interfaces/request'

import {
  ConflictError,
  NotFoundError,
  UnauthorizedError
} from '@helpers/api-errors'
import { jwtGenerator } from '@helpers/jwt-generator'

export const create = async (
  req: TypedRequestBody<UserAuthentication>,
  res: Response
) => {
  const { username, password } = req.body;
  const user = await services.getByUsername({ username });

  if (user !== null) {
    throw new ConflictError('O usuário já existe!');
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  await services.create({ username, password: hashedPassword });

  return res.status(201).send('Usuário criado com sucesso!');
}

export const login = async (
  req: TypedRequestBody<UserAuthentication>,
  res: Response
) => {
  const { username, password } = req.body;
  const user = await services.getByUsername({ username });

  if (user === null) {
    throw new NotFoundError('O usuário não existe!');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new UnauthorizedError('Nome de usuário ou senha incorreto!');
  }

  const token = jwtGenerator(user.id);

  await refreshTokenService.removeByUserId({ userId: user.id });

  const refreshToken = await refreshTokenService.create({ userId: user.id });

  return res.status(200).json({ token, refreshToken });
}
