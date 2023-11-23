import type { NextFunction, Request, Response } from "express";
import { notFound } from "../errorMiddleware";

describe("Given a Middleware NotFund method", () => {
  describe("When it receives a response", () => {
    const mockStatus = jest.fn().mockReturnThis();

    const req = {};
    const res: Pick<Response, "status" | "json"> = {
      status: mockStatus,
      json: jest.fn(),
    };

    const next: NextFunction = jest.fn();

    const expectedStatusCode = 404;

    test("Then it should call it's metod status 200", () => {
      notFound(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call it's method with a error: `Endpoint no found`", () => {
      const expectedError = { error: "Endpoint no found" };

      notFound(req as Request, res as Response, next);

      expect(res.status(expectedStatusCode).json).toHaveBeenCalledWith(
        expectedError,
      );
    });
  });
});
