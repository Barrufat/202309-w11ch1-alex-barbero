import "dotenv/config";
import "./server/index.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { connectToDatabase } from "./database/index.js";
import User from "./features/user/model/User.js";
import bcrypt from "bcrypt";
import { type LoginRequestData } from "./features/user/types";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const mongoDbUrl = server.getUri();
  await connectToDatabase(mongoDbUrl);

  const userCredencials: LoginRequestData = {
    username: "testusername",
    password: "1234",
  };

  const hashedPassword = await bcrypt.hash(userCredencials.password, 10);

  await User.create({
    name: "testname",
    username: "testusername",
    password: hashedPassword,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});
