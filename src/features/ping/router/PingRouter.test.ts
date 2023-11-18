import request from "supertest";
import "../../../server/index";
import { app } from "../../../server/app";

describe("Given a Get / endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a message 🏓", async () => {
      const expectedStatus = 200;
      const expectedMessage = "🏓";
      const path = "/";

      const response = await request(app).get(path).expect(expectedStatus);

      expect(response.body).toHaveProperty("message", expectedMessage);
    });
  });
});
