import { type UserWithoutPassword, type UserDataStructure } from "../types";

export interface UsersRepository {
  createUser(userData: UserDataStructure): Promise<UserWithoutPassword>;
  loginUser(userName: string, password: string): Promise<UserWithoutPassword>;
}

export default UsersRepository;
