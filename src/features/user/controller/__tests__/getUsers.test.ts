import type { Request, Response } from "express";
import type UsersMongooseRepository from "../../repository/UsersMongooseRepository";
import type UsersRepository from "../../repository/types";
import UsersController from "../UsersController";
import { userMock } from "../../mocks/usersMock";

beforeEach(() => {
  jest.restoreAllMocks();
});

describe("Given a UsersController's getUsers method", () => {
  describe("When it receives a response", () => {
    const usersRepository: Pick<UsersMongooseRepository, "getUsers"> = {
      getUsers: jest.fn().mockReturnValue(userMock),
    };

    const req = {};
    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnValue({ users: userMock }),
    };

    test("Then it should call its method status with 200", async () => {
      const expectedStatusCode = 200;

      const usersController = new UsersController(
        usersRepository as UsersRepository,
      );

      await usersController.getUsers(req as Request, res as Response);

      expect(res.status).toHaveBeenLastCalledWith(expectedStatusCode);
    });

    test("Then it should call its method with RoboBunny, BytePanda and TechPuppy", async () => {
      const expectedUsers = userMock;

      const usersController = new UsersController(
        usersRepository as UsersRepository,
      );

      await usersController.getUsers(req as Request, res as Response);

      expect(res.json).toHaveBeenLastCalledWith({ users: expectedUsers });
    });
  });
});
