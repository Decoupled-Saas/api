import db from "@/common/utils/db";

class KeyService {
  getKeys = async () => {
    return db("Keys").orderBy("created_at", "desc");
  };
}

export const keyService = new KeyService();
