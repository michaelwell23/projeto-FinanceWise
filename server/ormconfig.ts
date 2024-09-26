import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';

// Carregar variáveis de ambiente do .env
dotenv.config();

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost', // Garantir que seja apenas 'localhost'
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10), // Garantir que seja um número
  username: process.env.POSTGRES_USER || 'postgres', // Garantir string
  password: process.env.POSTGRES_PASSWORD || 'postgres', // Garantir string
  database: process.env.POSTGRES_DB || 'mindbalance_db', // Garantir string
  synchronize: process.env.POSTGRES_SYNCHRONIZE === 'true', // Verifica boolean a partir de string
  logging: process.env.POSTGRES_LOGGING === 'true', // Verifica boolean a partir de string
  entities: ['src/entities/*.ts'],
  migrations: ['src/database/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

export = config;
