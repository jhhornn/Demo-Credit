import { config as dotenvConfig } from 'dotenv';
import { DatabaseConfig, ServerConfig, AppConfig } from '../../utils/interfaces';
import path from 'path'
dotenvConfig({ path: path.resolve(__dirname, '../../../.env') });


const dbConfig: DatabaseConfig = {
  DB_CLIENT: process.env.PROD_DB_CLIENT || '',
  DB_HOST: process.env.PROD_DB_HOST || '',
  DB_PORT: parseInt(process.env.PROD_DB_PORT || '3306', 10),
  DB_USER: process.env.PROD_DB_USER || '',
  DB_PASSWORD: process.env.PROD_DB_PASSWORD || '',
  DB_NAME: process.env.PROD_DB_NAME || '',
};

const serverConfig: ServerConfig = {
    PORT: parseInt(process.env.PROD_SERVER_PORT || '3000', 10)
}

const appConfig: AppConfig = {
  KARMA_API_KEY: process.env.KARMA_API_KEY || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
  JWT_SECRET_EXP: process.env.JWT_SECRET_EXP || '',
  NODE_ENV: process.env.NODE_ENV || 'production'
}

export default {
    dbConfig,
    serverConfig,
    appConfig
}