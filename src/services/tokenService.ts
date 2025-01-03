import db from "@/common/utils/db";
import { env } from "@/common/utils/envConfig";
import moment from "moment";
import { JWK, JWS } from "node-jose";
import CreateSignResult = JWS.CreateSignResult;

class TokenService {
  generateToken = async (user_id: string, expires: moment.Moment, type: string) => {
    const keyList = await db("Keys").orderBy("createdAt", "DESC");
    const keys: any[] = [];

    switch (type) {
      case "ACCESS":
        keyList.forEach((element: { access_key: string }) => {
          keys.push(element.access_key);
        });
        break;
      case "REFRESH":
        keyList.forEach((element: { refresh_key: string }) => {
          keys.push(element.refresh_key);
        });
        break;
    }

    const keyStore = await JWK.asKeyStore({ keys: keys });
    const [key] = keyStore.all({ use: "sig" });

    const opt = { compact: true, jwk: key, fields: { type: "jwt" } };
    const payload = JSON.stringify({
      sub: user_id,
      iat: moment().unix(),
      exp: expires.unix(),
      type,
      issuer: "iam.decoupledsaas.com",
      audience: "decoupledsaas.com",
    });

    return await JWS.createSign(opt, key).update(payload).final();
  };

  saveToken = async (user_id: string, access: CreateSignResult, refresh: CreateSignResult) => {
    await db("Tokens").where({ user_id }).delete();
    return db("Tokens").insert({
      access,
      refresh,
      user_id,
    });
  };

  generateAuthTokens = async (user_id: string) => {
    const accessTokenExpires = moment().add(env.JWT_ACCESS_EXPIRATION_MINUTES, "minutes");
    const accessToken = await this.generateToken(user_id, accessTokenExpires, "ACCESS");

    const refreshTokenExpires = moment().add(env.JWT_REFRESH_EXPIRATION_DAYS, "days");
    const refreshToken = await this.generateToken(user_id, refreshTokenExpires, "REFRESH");

    await this.saveToken(user_id, accessToken, refreshToken);
    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toDate(),
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.toDate(),
      },
    };
  };

  deleteToken = (user_id: string) => {
    return db("Tokens").where({ user_id }).delete();
  };

  getAccessToken = async (access: string) => {
    return db("Tokens").where({ access }).first();
  };
}

export const tokenService = new TokenService();
