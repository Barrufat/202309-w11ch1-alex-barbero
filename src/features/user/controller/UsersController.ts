import { type JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import type UsersRepository from "../repository/types";
import type { NextFunction, Request, Response } from "express";
import { type UserDataStructure, type LoginRequestData } from "../types";
import CustomError from "../../../CustomError/CustomError.js";
import chalk from "chalk";
import debugCreator from "debug";

const debug = debugCreator("features:users:usersController");

class UsersController {
  constructor(private readonly usersRepository: UsersRepository) {}

  public getUsers = async (_req: Request, res: Response): Promise<void> => {
    const users = await this.usersRepository.getUsers();

    res.status(200).json({ users });
  };

  registerUser = async (
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      UserDataStructure
    >,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const userData = req.body;

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    userData.password = hashedPassword;

    try {
      const newUser = await this.usersRepository.createUser(userData);

      debug(chalk.green("New User succesfully registered!"));
      res.status(201).json(newUser);
    } catch (error) {
      const customError = new CustomError(
        "Impossible registering a new User",
        500,
        (error as Error).message,
        "users:usersController:registerUser",
      );

      next(customError);
    }
  };

  loginUser = async (
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      LoginRequestData
    >,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const userCredencials = req.body;

    try {
      const currentUser = await this.usersRepository.loginUser(
        userCredencials.username,
        userCredencials.password,
      );

      const userData: JwtPayload = {
        sub: currentUser._id,
        name: currentUser.username,
      };

      const token = jwt.sign(userData, process.env.JWT_SECRET_KEY!);

      res.status(200).json({ token });
    } catch (error) {
      const customError = new CustomError(
        "It was not possible to login",
        401,
        (error as Error).message,
        "robots:robotsController:loginUser",
      );

      next(customError);
    }
  };
}

export default UsersController;
