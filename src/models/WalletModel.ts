import { Knex } from 'knex';
import { IWallet } from '../utils/interfaces';
import generateAccountId from '../utils/generateAccountId';


class WalletModel {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  public async createWallet(userId: number, trx?: Knex.Transaction): Promise<string> {
    const walletId = generateAccountId();
    const query = this.knex('wallets').insert({
      wallet_id: walletId,
      user_id: userId,
      balance: 0,
    });
    if (trx) {
      await query.transacting(trx);
    } else {
      await query;
    }
    return walletId;
  }

  public async getWalletById(walletId: string): Promise<IWallet | null> {
    const wallet = await this.knex<IWallet>('wallets').where({ wallet_id: walletId }).first();
    return wallet || null;
  }

  public async getWalletByUserId(userId: number): Promise<IWallet | null> {
    const wallet = await this.knex<IWallet>('wallets').where({ user_id: userId }).first();
    return wallet || null;
  }

  public async getWalletByWalletId(walletId: string): Promise<IWallet | null> {
    const wallet = await this.knex<IWallet>('wallets').where({ wallet_id: walletId }).first();
    return wallet || null;
  }

  public async updateBalance(walletId: string, amount: number, trx?: Knex.Transaction): Promise<void> {
    const query = this.knex('wallets').where({ wallet_id: walletId }).increment('balance', amount);
    if (trx) {
      await query.transacting(trx);
    } else {
      await query;
    }
  }
}

export default WalletModel;
