import type { NextFunction, Request, Response } from "express";
import CustomError from "../CustomError/CustomError.js";
import debugCreator from "debug";
import { ValidationError } from "express-validation";

export const notFound = (_req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: "Endpoint no found" });

  const customError = new CustomError(
    "Endpoint no found",
    404,
    "features:errorMiddleWare:notFound",
  );

  next(customError);
};

const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof ValidationError && error.details.body) {
    const fullValidationError = error.details.body.reduce(
      (errorMessage, joiError): string => `${errorMessage} ${joiError.message}`,
      "",
    );

    error.privateMessage = fullValidationError as unknown as string;
  }

  if (error.privateMessage) {
    const debug = debugCreator(error.nameSpace ?? "features:errorMiddleWare");
    debug(error.privateMessage);
  }

  const statusCode = error.statusCode ?? 500;

  res.status(statusCode).json(error.message);
};

export default generalError;
