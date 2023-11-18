export type Grades = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface RobotsStructure {
  _id: string;
  name: string;
  image: string;
  velocity: Grades;
  resistance: Grades;
}

export interface RobotsRepository {
  getRobots: () => Promise<RobotsStructure[]>;
}
