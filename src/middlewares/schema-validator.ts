import { Request, Response, NextFunction } from "express";
import { SchemaValidationError } from "../helpers/api-errors";
import { UserAuthSchema } from "../api/users/user.model";
import {
  TaskCreateSchema,
  TaskOnlyUserIdSchema,
} from "../api/tasks/task.model";

export const authValidator = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const validationResult = UserAuthSchema.safeParse(req.body);

  if (validationResult.success === false) {
    const issues = validationResult.error.issues;

    const schemaErrors = issues.map((issue) => {
      return { field: issue.path[0], message: issue.message };
    }) as unknown as typeof SchemaValidationError.prototype.schemaError;

    throw new SchemaValidationError(
      "Erro na validação de campos",
      schemaErrors
    );
  } else {
    return next();
  }
};

export const createTaskValidator = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const validationResult = TaskCreateSchema.safeParse(req.body);

  if (validationResult.success === false) {
    const issues = validationResult.error.issues;

    const schemaErrors = issues.map((issue) => {
      return { field: issue.path[0], message: issue.message };
    }) as unknown as typeof SchemaValidationError.prototype.schemaError;

    throw new SchemaValidationError(
      "Erro na validação de campos",
      schemaErrors
    );
  } else {
    return next();
  }
};
