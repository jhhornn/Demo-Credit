import { Knex } from 'knex';
import config from '../config';
import { IUser } from '../utils/interfaces';
import customError from '../utils/customError';
import knex from '../config/db/db';

class User {
  private knex: Knex;

  constructor() {
    this.knex = knex;
  }

  public async create(user: IUser): Promise<IUser> {
    const [insertedId] = await this.knex('users').insert(user);
    const createdUser = await this.knex<IUser>('users')
      .where({ user_id: insertedId })
      .first();
    if (!createdUser) {
      throw new customError.NotFoundError('User not found');
    }
    return createdUser;
  }
}

export default new User();
