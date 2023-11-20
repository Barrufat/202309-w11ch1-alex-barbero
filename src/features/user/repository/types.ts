import {
  type UserWithoutPassword,
  type UserDataStructure,
  type UserStructure,
} from "../types";

export interface UsersRepository {
  getUsers(): Promise<UserStructure[]>;
  createUser(userData: UserDataStructure): Promise<UserWithoutPassword>;
  loginUser(userName: string, password: string): Promise<UserWithoutPassword>;
}

export default UsersRepository;
