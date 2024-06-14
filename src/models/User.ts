import { Knex } from "knex";
import config from "../config";
import { IUser } from "../utils/interfaces";

class User {
    private knex: Knex;

    constructor() {
        this.knex = config.db.connect;
    }

    public async create(user: IUser): Promise<IUser> {
        const [insertedId] = await this.knex('users').insert(user);
        const createdUser = await this.knex<IUser>('users').where({ user_id: insertedId }).first();
        if (!createdUser) {
            throw new Error('User not found');
          }
        return createdUser;
    }
}

export default new User();