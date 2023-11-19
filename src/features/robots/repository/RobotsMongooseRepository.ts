import Robot from "../model/Robot.js";
import {
  type RobotsRepository,
  type RobotData,
  type RobotStructure,
} from "../types";

class RobotsMongooseRepository implements RobotsRepository {
  public async getRobots(): Promise<RobotStructure[]> {
    const robots = await Robot.find();

    return robots;
  }

  public async createRobot(robot: RobotData): Promise<RobotStructure> {
    try {
      const createdRobot = await Robot.create(robot);
      return createdRobot;
    } catch (error) {
      throw new Error(
        "Creating a new robot was not possible: " + (error as Error).message,
      );
    }
  }
}

export default RobotsMongooseRepository;
