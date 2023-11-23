import { app } from "../../../../server/app";
import { type LoginRequestData } from "../../types";
import request from "supertest";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a POST /users/login endpoint", () => {
  describe("When it recieves a request with valid credentials", () => {
    const userCredencials: LoginRequestData = {
      username: "testusername",
      password: "1234",
    };

    test("Then it should respond with a 200 and a token", async () => {
      const expectedStatusCode = 200;

      const loginPath = "/users/login";

      const response = await request(app)
        .post(loginPath)
        .send(userCredencials)
        .expect(expectedStatusCode);

      const token = (await response.body) as Promise<{ token: string }>;

      expect(await token).not.toBeUndefined();
    });
  });

  describe("When it recieves a request with invalid credentials", () => {
    const userCredencials: Pick<LoginRequestData, "password"> = {
      password: "1234",
    };

    test("Then it should respond with a 401 and an error It was not possible to login ", async () => {
      const expectedStatusCode = 401;

      const loginPath = "/users/login";

      const response = await request(app)
        .post(loginPath)
        .send(userCredencials)
        .expect(expectedStatusCode);

      const errorMessage = response.statusCode;
      expect(errorMessage).toBe(expectedStatusCode);
    });
  });
});
