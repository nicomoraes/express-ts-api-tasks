import { Response } from "express";
import * as service from "./task,services";
import type { TypedRequestBody, TypedRequestParams } from "../../types/request";
import type { TaskCreate, TaskByUserId, TaskById } from "./task.model";

async function create(req: TypedRequestBody<TaskCreate>, res: Response) {
  const { title, description, userId } = req.body;
  const task = await service.create({ title, description, userId });
  return res.status(201).json(task);
}

async function get(req: TypedRequestParams<TaskById>, res: Response) {
  const { id } = req.params;
  const tasks = await service.get({ id });
  return res.status(200).json(tasks);
}

async function getAll(req: TypedRequestBody<TaskByUserId>, res: Response) {
  const { userId } = req.body;
  const tasks = await service.getAll({ userId });
  return res.status(200).json(tasks);
}

async function remove(req: TypedRequestParams<TaskById>, res: Response) {
  const { id } = req.params;
  const tasks = await service.get({ id });
  return res.status(200).json(tasks);
}

export { create, get, getAll, remove };
