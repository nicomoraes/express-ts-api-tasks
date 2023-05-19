import dayjs from 'dayjs';

import { type RefreshTokenByUserId, type RefreshTokenById } from './refresh-token.model';

import { prisma } from '@config/prisma-client';

const create = async ({ userId }: RefreshTokenByUserId) => {
  const expirationConfig = Number.parseInt(
    process.env.REFRESH_TOKEN_EXPIRES_IN!
  );
  const expiresIn = dayjs().add(expirationConfig, 'second').unix();

  const token = prisma.refreshToken.create({
    data: {
      user: {
        connect: {
          id: userId
        }
      },
      expiresIn
    }
  });

  return token;
};

const getById = async ({ id }: RefreshTokenById) => {
  const refreshToken = await prisma.refreshToken.findFirst({
    where: {
      id
    }
  });

  return refreshToken
};

const removeByUserId = async ({ userId }: RefreshTokenByUserId) => {
  const refreshToken = await prisma.refreshToken.deleteMany({
    where: {
      userId
    }
  });

  return refreshToken
};

export { create, getById, removeByUserId };
