import robotsMock from "../../../mock/robotsMock";
import type { RobotsRepository } from "../../../types";
import type { Request, Response } from "express";
import RobotsController from "../RobotsController";

beforeEach(() => {
  jest.restoreAllMocks();
});

describe("Given a RobotsController's getRobots method", () => {
  describe("When it receives a response", () => {
    const robotsRepository: Pick<RobotsRepository, "getRobots"> = {
      getRobots: jest.fn().mockReturnValue(robotsMock),
    };

    const req = {};
    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnValue({ robot: robotsMock }),
    };

    test("Then it should call its method status with 200", async () => {
      const expectedStatusCode = 200;

      const robotsController = new RobotsController(
        robotsRepository as RobotsRepository,
      );

      await robotsController.getRobots(req as Request, res as Response);

      expect(res.status).toHaveBeenLastCalledWith(expectedStatusCode);
    });

    test("Then it should call its method with RoboBunny, BytePanda and TechPuppy", async () => {
      const expectedRobots = robotsMock;

      const robotsController = new RobotsController(
        robotsRepository as RobotsRepository,
      );

      await robotsController.getRobots(req as Request, res as Response);

      expect(res.json).toHaveBeenLastCalledWith({ robots: expectedRobots });
    });
  });
});
