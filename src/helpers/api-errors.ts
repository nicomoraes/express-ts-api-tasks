export class ApiError extends Error {
  public readonly statusCode: number;

  constructor (message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends ApiError {
  constructor (message: string) {
    super(message, 400);
  }
}

interface SchemaErrorMessage { message: string, field: string }
type SchemaError = SchemaErrorMessage[]

export class SchemaValidationError extends ApiError {
  public readonly schemaError: SchemaError;

  constructor (message: string, schemaError: SchemaError) {
    super(message, 400);
    this.schemaError = schemaError;
  }
}

export class UnauthorizedError extends ApiError {
  constructor (message: string) {
    super(message, 401);
  }
}

export class NotFoundError extends ApiError {
  constructor (message: string) {
    super(message, 404);
  }
}

export class ConflictError extends ApiError {
  constructor (message: string) {
    super(message, 409);
  }
}
