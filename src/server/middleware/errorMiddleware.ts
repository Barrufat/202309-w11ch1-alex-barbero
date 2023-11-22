import type { NextFunction, Request, Response } from "express";
import CustomError from "../../CustomError/CustomError.js";
import debugCreator from "debug";

export const notFound = (_req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: "Endpoint no found" });

  const customError = new CustomError("Endpoint no found", 404, "app:notFound");

  next(customError);
};

const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const debug = debugCreator(error.nameSpace);

  const statusCode = error.statusCode ?? 500;

  debug(error.privateMessage);
  res.status(statusCode).json({ error: error.message });
};

export default generalError;
