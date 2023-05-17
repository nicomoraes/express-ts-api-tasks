import { prisma } from "../../config/prisma-client";
import dayjs from "dayjs";
import { UnauthorizedError } from "../../helpers/api-errors";
import { jwtGenerator } from "../../helpers/jwt-generator";

const create = async (userId: string) => {
  const expirationConfig = Number.parseInt(
    process.env.REFRESH_TOKEN_EXPIRES_IN!
  );
  const expiresIn = dayjs().add(expirationConfig, "second").unix();

  const token = prisma.refreshToken.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      expiresIn,
    },
  });

  return token;
};

const createTokenByRefreshToken = async (refreshTokenId: string) => {
  const refresh_token = await prisma.refreshToken.findFirst({
    where: {
      id: refreshTokenId,
    },
  });

  if (refresh_token === null) {
    throw new UnauthorizedError("Refresh token inválido!");
  }

  const token = jwtGenerator(refresh_token.userId);

  return { token };
};

export { create, createTokenByRefreshToken };
