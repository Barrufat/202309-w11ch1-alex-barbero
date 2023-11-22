import { type NextFunction, type Response } from "express";
import { newRobot } from "../../../mock/robotsMock";
import { type RobotsRepository, type CreateRobotRequest } from "../../../types";
import RobotsController from "../RobotsController";

describe("Given a robotsControllers's method createRobot", () => {
  const req: Pick<CreateRobotRequest, "body"> = {
    body: {
      name: "Testybot",
      image: "https://th.bing.com/th/id/OIG.zR3Icqpo9VJjglYjKZo5?pid=ImgGn",
      velocity: 2,
      resistance: 3,
    },
  };

  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  const next: NextFunction = jest.fn();

  describe("When it receives a response", () => {
    const robotsRepository: RobotsRepository = {
      getRobots: jest.fn(),
      createRobot: jest.fn().mockResolvedValue(newRobot),
    };

    const robotsController = new RobotsController(robotsRepository);

    test("Then it should call the method status with a 201", async () => {
      const expectedStatusCode = 201;

      await robotsController.createRobot(
        req as CreateRobotRequest,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its method json with the new robot", async () => {
      const expectedRobot = newRobot;

      await robotsController.createRobot(
        req as CreateRobotRequest,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({ robot: expectedRobot });
    });
  });
});
