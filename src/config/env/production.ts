import { config as dotenvConfig } from 'dotenv';
import { DatabaseConfig, ServerConfig } from '../../utils/interfaces';
dotenvConfig();


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

export default {
    dbConfig,
    serverConfig
}