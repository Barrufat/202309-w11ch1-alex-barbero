import jwt from "jsonwebtoken";
import { type Response } from "express";
import { type LoginUserRequest } from "../../types";
import type UsersRepository from "../../repository/types";
import UsersController from "../UsersController";
import { userMock } from "../../mocks/usersMock";

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

  describe("When it receives a response and a verificated username and password", () => {
    const usersRepository: Pick<UsersRepository, "loginUser"> = {
      loginUser: jest.fn().mockResolvedValue(userMock),
    };

    const usersController = new UsersController(
      usersRepository as UsersRepository,
    );

    test("Then it should call the method status with a 200", async () => {
      const expectedStatusCode = 200;

      await usersController.loginUser(req as LoginUserRequest, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the method status with a 200", async () => {
      await usersController.loginUser(req as LoginUserRequest, res as Response);

      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });

  describe("When it receives a request with an invalidated password and username", () => {
    const expectedWrongStatusCode = 401;

    const userRepository: Pick<UsersRepository, "loginUser"> = {
      loginUser: jest.fn().mockRejectedValue("error"),
    };
    const usersController = new UsersController(
      userRepository as UsersRepository,
    );

    test("Then it should call the status method of the response with status code 401", async () => {
      await usersController.loginUser(req as LoginUserRequest, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedWrongStatusCode);
    });

    test("Then it should call the json method of the response with an error message", async () => {
      const expectedErrorMessage = { error: "Impossible creating a new User" };

      await usersController.loginUser(req as LoginUserRequest, res as Response);

      expect(res.json).toHaveBeenCalledWith(expectedErrorMessage);
    });
  });
});
