import { type Request, type Response, type NextFunction } from 'express'

import { type ApiError, type SchemaValidationError } from '@helpers/api-errors'

const errorHandler = (
  error: Error & ApiError & Partial<SchemaValidationError>,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const schemaError = error.schemaError ?? null;
  const code = error.statusCode ?? 500;
  const message = (error.statusCode !== 0) ? error.message : 'Erro interno do servidor';

  const json: { message: string, errors?: typeof schemaError, code: number } = {
    message,
    code
  };

  !(schemaError === null) && (json.errors = schemaError);

  return res.status(code).json({ ...json });
}

export default errorHandler;
