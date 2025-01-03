import db from "@/common/utils/db";

class KeyService {
  getKeys = async () => {
    return db("Keys").orderBy("createdAt", "desc");
  };
}

export const keyService = new KeyService();
