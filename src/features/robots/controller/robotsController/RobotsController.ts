import type RobotsMongooseRepository from "../../repository/RobotsMongooseRepository.js";
import type { Request, Response } from "express";
import { type CreateRobotRequest } from "../../types.js";

class RobotsController {
  constructor(private readonly robotsRepository: RobotsMongooseRepository) {}

  public getRobots = async (_req: Request, res: Response): Promise<void> => {
    const robots = await this.robotsRepository.getRobots();

    res.status(200).json({ robots });
  };

  public createRobot = async (
    req: CreateRobotRequest,
    res: Response,
  ): Promise<void> => {
    const robotData = req.body;

    try {
      const newRobot = await this.robotsRepository.createRobot(robotData);
      res.status(201).json({ robot: newRobot });
    } catch {
      res.status(500).json({ error: "Impossible creating a new Robot" });
    }
  };
}

export default RobotsController;
