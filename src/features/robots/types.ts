export type Grades = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface RobotData {
  name: string;
  image: string;
  velocity: Grades;
  resistance: Grades;
}

export interface RobotStructure extends RobotData {
  id: string;
}

export interface RobotsRepository {
  getRobots: () => Promise<RobotStructure[]>;
  createRobot: (robot: RobotData) => Promise<RobotStructure>;
}
