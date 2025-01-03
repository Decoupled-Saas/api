import { logger } from "@/server";
import { knex } from "knex";
import knexFile from "../../../knexfile";

const env = process.env.NODE_ENV || "development";
const configOptions = knexFile[env];
const db = knex(configOptions);

db.on("query", (query: { bindings: any[]; sqlWithBindings: string; sql: any }) => {
  if (query?.bindings) {
    query.sqlWithBindings = query.sql;
    query.bindings.forEach((param, index) => {
      const knexBindingChar = `$${index + 1}`; // hardcode or insert logic for binding char by the database dialect you use .. ie. @p, :, $ and index value
      query.sqlWithBindings = query.sqlWithBindings.replace(
        knexBindingChar,
        Number.isNaN(Number(param)) && param !== "null" ? `'${param}'` : param,
      );
    });
  }
  logger.debug(query.sqlWithBindings || query.sql);
});

export default db;
