import Robot from "../model/Robot.js";
import {
  type RobotsRepository,
  type RobotData,
  type RobotStructure,
} from "../types";
import debugCreator from "debug";

const debug = debugCreator(
  "features:robots:repository:RobotsMongooseRepository",
);

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
      debug((error as Error).message);
      throw new Error("Creating a new robot was not possible: ");
    }
  }
}

export default RobotsMongooseRepository;
