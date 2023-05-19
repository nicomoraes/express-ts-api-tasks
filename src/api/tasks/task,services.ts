import type { TaskCreate, TaskByUserId, TaskById, TaskUpdate } from './task.model';

import { prisma } from '@config/prisma-client';

const create = async ({ userId, ...data }: TaskCreate) => {
  const task = await prisma.task.create({
    data: {
      ...data,
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

const update = async ({ id, ...data }: Partial<TaskUpdate> & TaskById) => {
  const tasks = await prisma.task.update({
    where: {
      id
    },
    data: {
      ...data,
      updated_at: new Date()
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

export { create, getAll, get, update, remove };
