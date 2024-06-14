import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser } from '../utils/interfaces';
import knex, { Knex } from 'knex';
import config from '../config';
import customError from '../utils/customError';
import { omitPassword } from '../utils/omitPassword';

class AuthService {
  private knex: Knex;
  private secret: string;

  constructor(knex: Knex) {
    this.knex = knex;
    this.secret = config.env_var.dev.appConfig.JWT_SECRET || '';
  }

  public async register(user: IUser): Promise<Omit<IUser, 'password'>> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const [insertedId] = await this.knex('users').insert({
      ...user,
      password: hashedPassword,
    });
    const createdUser = await this.knex<IUser>('users').where({ user_id: insertedId }).first();
    if (!createdUser) {
       throw new customError.NotFoundError('User not found after insertion');
    }
    return omitPassword(createdUser);
  }

  public async login(identifier: string, password: string): Promise<{ user: Omit<IUser, 'password'>; token: string }> {
    const user = await this.knex<IUser>('users')
      .where('email',identifier)
      .orWhere('username', identifier)
      .first();

    if (!user) {
        throw new customError.BadRequestError('Invalid username/email or password');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new customError.BadRequestError('Invalid username/email or password');
    }

    const token = jwt.sign({ userId: user.user_id },
        this.secret,
        { expiresIn: config.env_var.dev.appConfig.JWT_SECRET_EXP });

    return { user: omitPassword(user), token };
  }
}

export default AuthService;
