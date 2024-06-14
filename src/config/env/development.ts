import { config as dotenvConfig } from 'dotenv';
import { DatabaseConfig, ServerConfig, AppConfig } from '../../utils/interfaces';
dotenvConfig();


const dbConfig: DatabaseConfig = {
  DB_CLIENT: process.env.DB_CLIENT || '',
  DB_HOST: process.env.DB_HOST || '',
  DB_PORT: parseInt(process.env.DB_PORT || '3306', 10),
  DB_USER: process.env.DB_USER || '',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || '',
};

const serverConfig: ServerConfig = {
    PORT: parseInt(process.env.SERVER_PORT || '3000', 10)
}

const appConfig: AppConfig = {
    KARMA_API_KEY: process.env.KARMA_API_KEY || ''
}

export default {
    dbConfig,
    serverConfig,
    appConfig
}