import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const config: ConnectionOptions = {
  type: 'postgres', // Verifique se esse tipo está correto e a string é exatamente "postgres"
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'mindbalance_db',
  synchronize: process.env.POSTGRES_SYNCHRONIZE === 'true',
  logging: process.env.POSTGRES_LOGGING === 'true',
  entities: ['src/entities/*.ts'],
  migrations: ['src/database/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
