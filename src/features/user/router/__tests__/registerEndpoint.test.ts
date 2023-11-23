import { app } from "../../../../server/app";
import { type UserStructure, type UserDataStructure } from "../../types";
import request from "supertest";
import bcrypt from "bcrypt";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a POST /users/ endpoint", () => {
  describe("When it recieves a request with a new User data", () => {
    test("Then it should respond with a 201 and the newUserData", async () => {
      const newUserData: UserDataStructure = {
        name: "name",
        username: "testusername",
        password: "papafritas",
      };
      const hashedPassword = await bcrypt.hash(newUserData.password, 10);
      const expectedStatusCode = 201;

      const loginPath = "/users/";

      const response = await request(app)
        .post(loginPath)
        .send(newUserData)
        .expect(expectedStatusCode);

      newUserData.password = hashedPassword;

      expect(response.body.name as UserStructure).toBe(newUserData.name);
    });
  });

  describe("When it recieves a request with invalid User data", () => {
    const newUserData: Omit<UserDataStructure, "username"> = {
      name: "name",
      password: "1234",
    };

    test("Then it should respond with an error 400 It was not possible to login ", async () => {
      const expectedStatusCode = 400;
      const expectedErrorMessage = "Validation Failed";

      const loginPath = "/users/";

      const response = await request(app)
        .post(loginPath)
        .send(newUserData)
        .expect(expectedStatusCode);

      expect(response.statusCode).toBe(expectedStatusCode);
      expect(response.body).toBe(expectedErrorMessage);
    });
  });
});
