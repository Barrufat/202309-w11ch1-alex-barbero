import type { Request, Response } from "express";
import PingController from "./PingController";

describe("Given a PingController's getPong method", () => {
  describe("When it receives a response", () => {
    const pingController = new PingController();
    const mockStatus = jest.fn().mockReturnValue({ json: jest.fn() });

    const req = {};
    const res: Pick<Response, "status" | "json"> = {
      status: mockStatus,
      json: jest.fn(),
    };

    const expectedStatusCode = 200;

    test("Then it should call it's method status with 200", () => {
      pingController.getPong(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call it's method with a message: 🏓", () => {
      const expectedMessage = { message: "🏓" };

      pingController.getPong(req as Request, res as Response);

      expect(res.status(expectedStatusCode).json).toHaveBeenCalledWith(
        expectedMessage,
      );
    });
  });
});
