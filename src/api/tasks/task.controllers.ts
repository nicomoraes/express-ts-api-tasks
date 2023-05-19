import { type Response } from 'express';

import * as service from './task,services';
import type { TaskCreate, TaskByUserId, TaskById, TaskUpdate } from './task.model';

import type { TypedRequestBody, TypedRequestBodyAndParams, TypedRequestParams } from '@interfaces/request';

import { NotFoundError } from '@helpers/api-errors';

const create = async (req: TypedRequestBody<TaskCreate>, res: Response) => {
  const { userId, ...data } = req.body;
  const task = await service.create({ userId, ...data });
  return res.status(201).json(task);
}

const get = async (req: TypedRequestParams<TaskById>, res: Response) => {
  const { id } = req.params;
  const tasks = await service.get({ id });

  if (tasks === null) {
    throw new NotFoundError('A tarefa não existe')
  }

  return res.status(200).json(tasks);
}

const getAll = async (req: TypedRequestBody<TaskByUserId>, res: Response) => {
  const { userId } = req.body;
  const tasks = await service.getAll({ userId });

  if (tasks === null) {
    throw new NotFoundError('Não há tarefas salvas')
  }

  return res.status(200).json(tasks);
}

const update = async (req: TypedRequestBodyAndParams<TaskUpdate, TaskById>, res: Response) => {
  const { id } = req.params;
  const { ...data } = req.body;

  if (await service.get({ id }) === null) {
    throw new NotFoundError('A tarefas não existe')
  }

  const tasks = await service.update({ id, ...data });
  return res.status(200).json(tasks);
}

const remove = async (req: TypedRequestParams<TaskById>, res: Response) => {
  const { id } = req.params;

  if (await service.get({ id }) === null) {
    throw new NotFoundError('A tarefas não existe')
  }

  const tasks = await service.remove({ id });
  return res.status(200).json(tasks);
}

export { create, get, getAll, update, remove };
