import Robots from "../model/Robots.js";
import { type RobotsRepository, type RobotsStructure } from "../types";

class RobotsMongooseRepository implements RobotsRepository {
  public getRobots = async (): Promise<RobotsStructure[]> => {
    const robots = await Robots.find();
    return robots;
  };
}

export default RobotsMongooseRepository;
