import type { TaskCreate, TaskByUserId, TaskById } from './task.model';

import { prisma } from '@config/prisma-client';

const create = async ({ title, description, userId }: TaskCreate) => {
  const task = await prisma.task.create({
    data: {
      title,
      description,
      user: {
        connect: {
          id: userId
        }
      }
    }
  });

  return task;
};

const get = async ({ id }: TaskById) => {
  const task = await prisma.task.findUnique({
    where: {
      id
    }
  });

  return task;
};

const getAll = async ({ userId }: TaskByUserId) => {
  const tasks = await prisma.task.findMany({
    where: {
      userId
    }
  });

  return tasks;
};

const remove = async ({ id }: TaskById) => {
  const task = await prisma.task.delete({
    where: {
      id
    }
  });

  return task;
};

export { create, getAll, get, remove };
