import { JWK } from 'node-jose';
import { knex } from 'knex';
import knexFile from '../knexfile';
import * as dotenv from 'dotenv';
dotenv.config();

const env = process.env.NODE_ENV || 'development';
// @ts-ignore
const configOptions = knexFile[env];

const db = knex(configOptions);

async function main() {
  const accessKeyStore = JWK.createKeyStore();
  const refreshKeyStore = JWK.createKeyStore();

  const accessKey = await accessKeyStore.generate('RSA', 2048, { alg: 'RS256', use: 'sig' });
  const refreshKey = await refreshKeyStore.generate('RSA', 2048, { alg: 'RS256', use: 'sig' });

  await db('Keys').insert({ access_key: accessKey.toJSON(true), refresh_key: refreshKey.toJSON(true) });

  // eslint-disable-next-line no-console
  console.log(accessKey.toJSON());
  console.log(refreshKey.toJSON());
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
