import User from "../model/User";
import { type UserWithoutPassword, type UserDataStructure } from "../types";
import type UsersRepository from "./types";
import bcrypt from "bcrypt";

class UsersMongooseRepository implements UsersRepository {
  async createUser(userData: UserDataStructure): Promise<UserWithoutPassword> {
    const newUser = await User.create(userData);

    const { password, ...userWithoutPassword } = newUser.toJSON();

    return userWithoutPassword;
  }

  async loginUser(
    userName: string,
    password: string,
  ): Promise<UserWithoutPassword> {
    const currentUser = await User.findOne({ userName });

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
