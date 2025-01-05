import db from "@/common/utils/db";

class IamService {
  async getRoles() {
    return db("Roles").select("name", "description").orderBy("name", "asc");
  }

  async findRoleByName(name: string) {
    return db("Roles").where({ name }).first();
  }

  async getPermissions() {
    return db("Permissions").select("name", "description").orderBy("name", "asc");
  }

  async findPermissionByName(name: string) {
    return db("Permissions").where({ name }).first();
  }

  async roleHasPermission(role_id: string, permission: string) {
    const permission_data = await this.findPermissionByName(permission);
    return db("RolePermissions").where({ role_id: role_id, permission_id: permission_data.id }).first();
  }
}

export const iamService = new IamService();
