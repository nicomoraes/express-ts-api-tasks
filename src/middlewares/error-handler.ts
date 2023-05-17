import { Request, Response, NextFunction } from "express";
import { type ApiError, SchemaValidationError } from "../helpers/api-errors";

const errorHandler = (
  error: Error & ApiError & Partial<SchemaValidationError>,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const schemaError = error.schemaError ?? null;
  const code = error.statusCode ?? 500;
  const message = error.statusCode ? error.message : "Erro interno do servidor";

  const json: { message: string; errors?: typeof schemaError; code: number } = {
    message,
    code,
  };

  !!schemaError && (json.errors = schemaError);

  return res.status(code).json({ ...json });
};

export default errorHandler;
