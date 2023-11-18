import "../../../../server/index";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import { connectToDatabase } from "../../../../database/index.js";
import mongoose from "mongoose";
import type { RobotsStructure } from "../../types";
import { app } from "../../../../server/app";
import robotsMock from "../../mock/robotsMock";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const mongoDbUrl = server.getUri();
  await connectToDatabase(mongoDbUrl);
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

describe("Given GET /robots endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a status 200 and a list of robots: RoboBunny, BytePanda and TechPuppy", async () => {
      const expectedStatus = 200;
      const robotsPath = "/robots";

      const response = await request(app)
        .get(robotsPath)
        .expect(expectedStatus);

      const responseBody = response.body as { robots: RobotsStructure[] };

      responseBody.robots.forEach((robot, robotPosition) => {
        expect(robot).toHaveProperty("name", robotsMock[robotPosition].name);
      });
    });
  });
});
