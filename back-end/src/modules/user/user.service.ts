// src/users/usersService.ts
import { User } from "./user.model";
import { getRepository, Like } from "typeorm";

export const getUsers = async (name?: string): Promise<User[]> => {
  const userRepository = getRepository(User);

  if (name) {
    return await userRepository.find({
      where: { firstName: Like(`%${name}%`) },
    });
  } else {
    return await userRepository.find();
  }
};

export const createUser = async (user: User): Promise<void> => {
  const userRepository = getRepository(User);
  await userRepository.insert(user);
};
