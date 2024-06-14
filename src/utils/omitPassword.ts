// src/utils/omitPassword.ts
import { IUser } from './interfaces';

export function omitPassword(user: IUser): Omit<IUser, 'password'> {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
