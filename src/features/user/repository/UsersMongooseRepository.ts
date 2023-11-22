import User from "../model/User.js";
import {
  type UserWithoutPassword,
  type UserDataStructure,
  type UserStructure,
} from "../types";
import type UsersRepository from "./types";
import bcrypt from "bcrypt";
import chalk from "chalk";
import debugCreator from "debug";

const debug = debugCreator("features:users:usersRepository");

class UsersMongooseRepository implements UsersRepository {
  public async getUsers(): Promise<UserStructure[]> {
    const users = await User.find();

    return users;
  }

  async createUser(userData: UserDataStructure): Promise<UserWithoutPassword> {
    try {
      const newUser = await User.create(userData);

      const { password, ...userWithoutPassword } = newUser.toJSON();

      return userWithoutPassword;
    } catch (error) {
      debug(chalk.red((error as Error).message));
      throw new Error("There's was an error while creating the new User");
    }
  }

  async loginUser(
    username: string,
    password: string,
  ): Promise<UserWithoutPassword> {
    const currentUser = await User.findOne({ username });

    if (!currentUser) {
      throw new Error("User not found!");
    }

    if (!(await bcrypt.compare(password, currentUser.password))) {
      throw new Error("Incorrect credentials!");
    }

    return currentUser;
  }
}

export default UsersMongooseRepository;
