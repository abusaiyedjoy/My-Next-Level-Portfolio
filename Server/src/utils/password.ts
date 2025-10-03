import bcryptjs from 'bcryptjs';
import { envVars } from '../config/env';

export const hashPassword = async (password: string): Promise<string> => {
  return await bcryptjs.hash(password, Number(envVars.BCRYPT_SALT_ROUND));
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcryptjs.compare(password, hashedPassword);
};
