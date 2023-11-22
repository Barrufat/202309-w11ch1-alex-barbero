import type RobotsMongooseRepository from "../../repository/RobotsMongooseRepository.js";
import type { NextFunction, Request, Response } from "express";
import { type CreateRobotRequest } from "../../types.js";
import CustomError from "../../../../CustomError/CustomError.js";
import chalk from "chalk";
import debugCreator from "debug";

const debug = debugCreator("features:robots:robotsController");

class RobotsController {
  constructor(private readonly robotsRepository: RobotsMongooseRepository) {}

  public getRobots = async (
    _req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<void> => {
    const robots = await this.robotsRepository.getRobots();

    res.status(200).json({ robots });
  };

  public createRobot = async (
    req: CreateRobotRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const robotData = req.body;

    try {
      const newRobot = await this.robotsRepository.createRobot(robotData);

      debug(chalk.green("New robot succesfully created!"));
      res.status(201).json({ robot: newRobot });
    } catch (error) {
      const customError = new CustomError(
        "Impossible creating a new Robot",
        500,
        (error as Error).message,
        "robots:robotsController:createRobot",
      );

      next(customError);
    }
  };
}

export default RobotsController;
