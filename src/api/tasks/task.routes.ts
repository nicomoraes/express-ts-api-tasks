import { Router } from 'express';

import * as controllers from './task.controllers';
import { TaskCreateSchema, TaskUpdateSchema } from './task.model';

import { jwtValidator } from '@middlewares/jwt-validator';
import { validateBody } from '@middlewares/schema-validator';

const taskRouter = Router();

taskRouter.post(
  '/create',
  jwtValidator,
  validateBody(TaskCreateSchema),
  controllers.create
);
taskRouter.get('/get/:id', jwtValidator, controllers.get);
taskRouter.get('/getAll', jwtValidator, controllers.getAll);
taskRouter.patch('/update/:id', jwtValidator, validateBody(TaskUpdateSchema), controllers.update);
taskRouter.delete('/remove/:id', jwtValidator, controllers.remove);

export default taskRouter;
