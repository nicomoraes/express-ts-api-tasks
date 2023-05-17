import { type Request, type Response, type NextFunction } from 'express';

import { SchemaValidationError } from '@helpers/api-errors';

import { TaskCreateSchema } from '@api/tasks/task.model';
import { UserAuthSchema } from '@api/users/user.model';

export const authValidator = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const validationResult = UserAuthSchema.safeParse(req.body);

  if (!validationResult.success) {
    const issues = validationResult.error.issues;

    const schemaErrors = issues.map((issue) => {
      return { field: issue.path[0], message: issue.message };
    }) as unknown as typeof SchemaValidationError.prototype.schemaError;

    throw new SchemaValidationError(
      'Erro na validação de campos',
      schemaErrors
    );
  } else {
    next();
  }
};

export const createTaskValidator = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const validationResult = TaskCreateSchema.safeParse(req.body);

  if (!validationResult.success) {
    const issues = validationResult.error.issues;

    const schemaErrors = issues.map((issue) => {
      return { field: issue.path[0], message: issue.message };
    }) as unknown as typeof SchemaValidationError.prototype.schemaError;

    throw new SchemaValidationError(
      'Erro na validação de campos',
      schemaErrors
    );
  } else {
    next();
  }
};
