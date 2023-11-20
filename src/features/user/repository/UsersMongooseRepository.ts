import User from "../model/User.js";
import {
  type UserWithoutPassword,
  type UserDataStructure,
  type UserStructure,
} from "../types";
import type UsersRepository from "./types";
import bcrypt from "bcrypt";

class UsersMongooseRepository implements UsersRepository {
  public async getUsers(): Promise<UserStructure[]> {
    const users = await User.find();

    return users;
  }

  async createUser(userData: UserDataStructure): Promise<UserWithoutPassword> {
    const newUser = await User.create(userData);

    const { password, ...userWithoutPassword } = newUser.toJSON();

    return userWithoutPassword;
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
