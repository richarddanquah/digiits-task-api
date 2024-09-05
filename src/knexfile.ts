import type { Knex } from 'knex';
import { config as dotenvConfig } from 'dotenv';
import path from 'path';

dotenvConfig();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: path.join(__dirname, 'src/db/migrations/'),
      extension: 'ts', // Ensure TypeScript files are recognized
    },
    seeds: {
        directory: path.join(__dirname, 'src/db/seeds'),
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
        directory: path.join(__dirname, 'src/db/migrations'),
      extension: 'ts',
    },
    seeds: {
        directory: path.join(__dirname, 'src/db/seeds'),
    },
  },
};

export default config;
