import jwt from "jsonwebtoken";
import { type NextFunction, type Response } from "express";
import { type LoginUserRequest } from "../../types";
import type UsersRepository from "../../repository/types";
import UsersController from "../UsersController";
import { userMock } from "../../mocks/usersMock";
import type CustomError from "../../../../server/CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a usersController's method loginUser", () => {
  const token = { token: "blablabla" };

  jwt.sign = jest.fn().mockReturnValue(token);

  const req: Pick<LoginUserRequest, "body"> = {
    body: {
      password: "barru24",
      username: "barrufat",
    },
  };

  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next: NextFunction = jest.fn();

  describe("When it receives a response and a verificated username and password", () => {
    const usersRepository: Pick<UsersRepository, "loginUser"> = {
      loginUser: jest.fn().mockResolvedValue(userMock),
    };

    const usersController = new UsersController(
      usersRepository as UsersRepository,
    );

    test("Then it should call the method status with a 200", async () => {
      const expectedStatusCode = 200;

      await usersController.loginUser(
        req as LoginUserRequest,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the method status with a 200", async () => {
      await usersController.loginUser(
        req as LoginUserRequest,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });

  describe("When it receives a request with an invalidated password and username", () => {
    const expectedWrongStatusCode = 401;
    const expectedErrorMessage = "It was not possible to login";

    const userRepository: Pick<UsersRepository, "loginUser"> = {
      loginUser: jest.fn().mockRejectedValue("error"),
    };
    const usersController = new UsersController(
      userRepository as UsersRepository,
    );

    test("Then it should call the status method of the response with status code 401", async () => {
      await usersController.loginUser(
        req as LoginUserRequest,
        res as Response,
        next,
      );
    });

    test("Then it should call the json method of the response with an error message", async () => {
      await usersController.loginUser(
        req as LoginUserRequest,
        res as Response,
        next,
      );

      const expectedError: Partial<CustomError> = {
        statusCode: expectedWrongStatusCode,
        message: expectedErrorMessage,
      };

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
