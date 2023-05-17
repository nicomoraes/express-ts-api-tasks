import { prisma } from "../../config/prisma-client";
import { UserAuthentication, UserByUsername, UserById } from "./user.model";

const create = async ({ username, password }: UserAuthentication) => {
  const user = await prisma.user.create({
    data: {
      username,
      password,
    },
  });

  return user;
};

const getByUsername = async ({ username }: UserByUsername) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  return user;
};

const getById = async ({ id }: UserById) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};

export { create, getByUsername, getById };
