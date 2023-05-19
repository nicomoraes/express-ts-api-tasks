import { type Request, type Response, type NextFunction } from 'express'
import { type AnyZodObject } from 'zod';

import { SchemaValidationError } from '@helpers/api-errors';

const validateBody = (schema: AnyZodObject) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    const validationResult = schema.safeParse(req.body);

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

export { validateBody }
