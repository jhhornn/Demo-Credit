import  {Knex}  from "knex";
import db from "../env";

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: db.dev.dbConfig.DB_CLIENT,
    connection: {
      host: db.dev.dbConfig.DB_HOST,
      user: db.dev.dbConfig.DB_USER,
      password: db.dev.dbConfig.DB_PASSWORD,
      database: db.dev.dbConfig.DB_NAME,
      port: db.dev.dbConfig.DB_PORT,
    },
    pool: { min: 0, max: 7 },
    migrations: {
      directory: '../../database/migrations',
    },
    seeds: {
      directory: '../../database/seeders',
    },
  },

  production: {
    client: db.prod.dbConfig.DB_CLIENT,
    connection: {
      host: db.prod.dbConfig.DB_HOST,
      user: db.prod.dbConfig.DB_USER,
      password: db.prod.dbConfig.DB_PASSWORD,
      database: db.prod.dbConfig.DB_NAME,
      port: db.prod.dbConfig.DB_PORT,
    },
    pool: { min: 2, max: 10 },
    migrations: {
      directory: '../../database/migrations',
    },
    seeds: {
      directory: '../../database/seeds',
    },
  },
}

export default knexConfig
