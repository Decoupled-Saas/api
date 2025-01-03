import bcrypt from "bcryptjs";

export const encryptPassword = async (password: string) => await bcrypt.hash(password, 12);

export const isPasswordMatch = async (password: string, userPassword: string) =>
  await bcrypt.compare(password, userPassword);
