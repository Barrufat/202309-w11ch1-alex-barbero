export interface UserStructure {
  _id: string;
  name: string;
  username: string;
  password: string;
}

export type UserDataStructure = Omit<UserStructure, "_id">;

export type UserWithoutPassword = Omit<UserStructure, "password">;
