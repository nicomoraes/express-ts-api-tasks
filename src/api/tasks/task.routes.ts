import { Router } from 'express';

import * as controllers from './task.controllers';

import { jwtValidator } from '@middlewares/jwt-validator';
import { createTaskValidator } from '@middlewares/schema-validator';

const taskRouter = Router();

taskRouter.post(
  '/create',
  jwtValidator,
  createTaskValidator,
  controllers.create
);

taskRouter.get('/getAll', jwtValidator, controllers.getAll);
taskRouter.get('/get/:id', jwtValidator, controllers.get);

export default taskRouter;
