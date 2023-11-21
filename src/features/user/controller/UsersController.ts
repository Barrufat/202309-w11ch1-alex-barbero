import { type JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import type UsersRepository from "../repository/types";
import type { Request, Response } from "express";
import { type UserDataStructure, type LoginRequestData } from "../types";

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
  ) => {
    const userData = req.body;

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    userData.password = hashedPassword;

    try {
      const newUser = await this.usersRepository.createUser(userData);

      res.status(201).json(newUser);
    } catch {
      res.status(500).json({ error: "Impossible creating a new User" });
    }
  };

  loginUser = async (
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      LoginRequestData
    >,
    res: Response,
  ) => {
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

      const token = jwt.sign(userData, "POTATOES");

      res.status(200).json({ token });
    } catch {
      res.status(401).json({ error: "Impossible creating a new User" });
    }
  };
}

export default UsersController;
