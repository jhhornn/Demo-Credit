import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser, IWallet } from '../utils/interfaces';
import knex, { Knex } from 'knex';
import config from '../config';
import customError from '../utils/customError';
import { omitPassword } from '../utils/omitPassword';
import WalletModel from '../models/WalletModel';
import hashPassword from '../utils/hashPassword';

class AuthService {
  private knex: Knex;
  private secret: string;
  private walletModel: WalletModel;

  constructor(knex: Knex) {
    this.knex = knex;
    this.secret = config.env_var.dev.appConfig.JWT_SECRET || '';
    this.walletModel = new WalletModel(knex);
  }

  public async register(user: IUser): Promise<Omit<IUser, 'password'>> {
    return await this.knex.transaction(async (trx) => {
      const hashedPassword = await hashPassword(user.password);

      const [insertedId] = await this.knex('users')
        .insert({
          ...user,
          password: hashedPassword,
        })
        .transacting(trx);

      const createdUser = await this.knex<IUser>('users')
        .where({ user_id: insertedId })
        .first()
        .transacting(trx);
      if (!createdUser) {
        throw new customError.NotFoundError('User not found after insertion');
      }

      await this.walletModel.createWallet(insertedId, trx);

      return omitPassword(createdUser);
    });
  }

  public async login(
    identifier: string,
    password: string
  ): Promise<{ user: Omit<IUser, 'password'>; token: string }> {
    const user = await this.knex<IUser>('users')
      .where('email', identifier)
      .orWhere('username', identifier)
      .first();

    if (!user) {
      throw new customError.BadRequestError(
        'Invalid username/email or password'
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new customError.BadRequestError(
        'Invalid username/email or password'
      );
    }

    const token = jwt.sign({ userId: user.user_id }, this.secret, {
      expiresIn: config.env_var.dev.appConfig.JWT_SECRET_EXP,
    });

    return { user: omitPassword(user), token };
  }
}

export default AuthService;
