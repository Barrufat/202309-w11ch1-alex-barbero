import { Schema, model } from "mongoose";
import { type RobotsStructure } from "../types";

const robotsSchema = new Schema<RobotsStructure>({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  velocity: {
    type: String,
    required: true,
  },
  resistance: {
    type: String,
    required: true,
  },
});

const Robots = model("Robots", robotsSchema, "robots");

export default Robots;
