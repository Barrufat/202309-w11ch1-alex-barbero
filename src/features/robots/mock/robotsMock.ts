import { type RobotData, type RobotStructure } from "../types";

const robotsMock: RobotStructure[] = [
  {
    id: "a",
    name: "RoboBunny",
    image: "https://th.bing.com/th/id/OIG.sk1dXy.kAzVTdNVlZpt9?pid=ImgGn",
    velocity: 3,
    resistance: 6,
  },
  {
    id: "b",
    name: "BytePanda",
    image: "https://th.bing.com/th/id/OIG.eLRsv0YctHaCrsF4a07Z?pid=ImgGn",
    velocity: 7,
    resistance: 5,
  },
  {
    id: "c",
    name: "TechPuppy",
    image: "https://th.bing.com/th/id/OIG.zR3Icqpo9VJjglYjKZo5?pid=ImgGn",
    velocity: 3,
    resistance: 7,
  },
];

export const newRobot: RobotData = {
  name: "Testybot",
  image: "https://th.bing.com/th/id/OIG.zR3Icqpo9VJjglYjKZo5?pid=ImgGn",
  velocity: 2,
  resistance: 3,
};

export default robotsMock;
