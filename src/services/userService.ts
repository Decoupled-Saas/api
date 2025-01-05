import db from "@/common/utils/db";
import { encryptPassword, isPasswordMatch } from "@/common/utils/encryption";

class UserService {
  async getUserByEmail(email: string) {
    const result = await db("Users").where({ email: email }).first();
    if (result) {
      const { password, ...userWithoutPassword } = result;
      return userWithoutPassword;
    }
    return;
  }

  async createUser(first_name: string, last_name: string, email: string, password: string, role_id: string) {
    const exists = await this.getUserByEmail(email);
    if (exists) {
      return exists;
    }

    const passHash = await encryptPassword(password);
    await db("Users").insert({
      first_name,
      last_name,
      email,
      role_id,
      password: passHash,
    });

    return this.getUserByEmail(email);
  }

  async loginUser(email: string, password: string) {
    const user = await db("Users").where({ email: email }).first();
    if (!user) {
      return null;
    }

    const isPasswordValid = await isPasswordMatch(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return this.getUserByEmail(email);
  }
}

export const userService = new UserService();
