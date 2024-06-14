import  {Knex}  from "knex";
import db from "../env";


// const knexConfig = Knex({
//     client: db.dev.dbConfig.DB_CLIENT,
//     connection: {
//       host: db.dev.dbConfig.DB_HOST,
//       port: db.dev.dbConfig.DB_PORT,
//       user: db.dev.dbConfig.DB_USER,
//       password: db.dev.dbConfig.DB_PASSWORD,
//       database: db.dev.dbConfig.DB_NAME,
//     }
// })

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
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
}

export default knexConfig
