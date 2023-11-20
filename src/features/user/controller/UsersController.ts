import type UsersRepository from "../repository/types";
import type { Request, Response } from "express";
import { type UserStructure, type UserDataStructure } from "../types";
import { type JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

class UsersController {
  constructor(private readonly usersRepository: UsersRepository) {}

  registerUser = async (
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      UserDataStructure
    >,
    res: Response,
  ) => {
    const userData = req.body;
    try {
      const newUser = await this.usersRepository.createUser(userData);
      res.status(201).json(newUser);
    } catch {
      res.status(500).json({ error: "Impossible creating a new Robot" });
    }
  };

  loginUser = async (
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      UserStructure
    >,
    res: Response,
  ) => {
    const userCredencials = req.body;

    const currentUser = await this.usersRepository.loginUser(
      userCredencials.username,
      userCredencials.password,
    );

    const userData: JwtPayload = {
      sub: currentUser._id,
      name: currentUser.username,
    };

    const token = jwt.sign(userData, "POTATOES");

    res.status(201).json(token);
  };
}

export default UsersController;
