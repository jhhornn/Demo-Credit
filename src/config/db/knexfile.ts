import  Knex  from "knex";
import db from "../env";


const knexConfig = Knex({
    client: db.dev.dbConfig.DB_CLIENT,
    connection: {
      host: db.dev.dbConfig.DB_HOST,
      port: db.dev.dbConfig.DB_PORT,
      user: db.dev.dbConfig.DB_USER,
      password: db.dev.dbConfig.DB_PASSWORD,
      database: db.dev.dbConfig.DB_NAME,
    }
})

export default knexConfig
