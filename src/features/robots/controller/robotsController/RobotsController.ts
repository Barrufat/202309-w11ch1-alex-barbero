import type RobotsMongooseRepository from "../../repository/RobotsMongooseRepository.js";
import type { Request, Response } from "express";

class RobotsController {
  constructor(private readonly robotsRepository: RobotsMongooseRepository) {}

  public getRobots = async (_req: Request, res: Response): Promise<void> => {
    const robots = await this.robotsRepository.getRobots();

    res.status(200).json({ robots });
  };
}

export default RobotsController;
