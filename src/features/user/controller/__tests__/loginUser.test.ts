import { type Response } from "express";
import { type LoginUserRequest } from "../../types";
import type UsersRepository from "../../repository/types";
import UsersController from "../UsersController";
import { userMock } from "../../mocks/usersMock";

describe("Given a usersController's method loginUser", () => {
  const req: Pick<LoginUserRequest, "body"> = {
    body: {
      password: "alexpass",
      username: "alexito",
    },
  };

  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  describe("When it receives a response and a verificated username and password", () => {
    const usersRepository: UsersRepository = {
      getUsers: jest.fn(),
      loginUser: jest.fn().mockResolvedValue(userMock),
      createUser: jest.fn(),
    };

    const usersController = new UsersController(usersRepository);

    test("Then it should call the method status with a 200", async () => {
      const expectedStatusCode = 200;

      await usersController.loginUser(req as LoginUserRequest, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });
});
