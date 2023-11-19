import { Schema, model } from "mongoose";
import { type RobotStructure } from "../types";

const robotSchema = new Schema<RobotStructure>({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  velocity: {
    type: Number,
    required: true,
  },
  resistance: {
    type: Number,
    required: true,
  },
});

const Robot = model("Robots", robotSchema, "robots");

export default Robot;
