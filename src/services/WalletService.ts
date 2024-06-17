import { Knex } from 'knex';
import WalletModel from '../models/WalletModel';
import TransactionModel from '../models/TransactionModel.';
import { IWallet, ITransaction } from '../utils/interfaces';
import customError from '../utils/customError';

class WalletService {
  private knex: Knex;
  private walletModel: WalletModel;
  private transactionModel: TransactionModel;

  constructor(knex: Knex) {
    this.knex = knex;
    this.walletModel = new WalletModel(knex);
    this.transactionModel = new TransactionModel(knex);
  }

  public async createWallet(userId: number): Promise<string> {
    return this.walletModel.createWallet(userId);
  }

  public async getWalletByUserId(userId: number): Promise<IWallet | null> {
    return this.walletModel.getWalletByUserId(userId);
  }

  public async fundWallet(walletId: string, amount: number): Promise<void> {
    await this.knex.transaction(async (trx) => {
      await this.walletModel.updateBalance(walletId, amount, trx);
      await this.transactionModel.createTransaction(
        {
          wallet_id: walletId,
          type: 'fund',
          amount,
          recipient_account_id: walletId,
        },
        trx
      );
    });
  }

  public async withdraw(walletId: string, amount: number): Promise<void> {
    await this.knex.transaction(async (trx) => {
      const wallet = await this.walletModel.getWalletByWalletId(walletId);
      if (!wallet || wallet.balance < amount) {
        throw new customError.BadRequestError('Insufficient funds');
      }
      await this.walletModel.updateBalance(walletId, -amount, trx);
      await this.transactionModel.createTransaction(
        {
          wallet_id: walletId,
          type: 'withdraw',
          amount,
          recipient_account_id: walletId,
        },
        trx
      );
    });
  }

  public async transfer(
    fromWalletId: string,
    toWalletId: string,
    amount: number
  ): Promise<void> {
    await this.knex.transaction(async (trx) => {
      const toWallet = await this.walletModel.getWalletByWalletId(toWalletId);
      if (!toWallet) {
        throw new customError.BadRequestError(
          "Recipient's wallet ID does not exist"
        );
      }
      const fromWallet =
        await this.walletModel.getWalletByWalletId(fromWalletId);
      if (!fromWallet || fromWallet.balance < amount) {
        throw new customError.BadRequestError('Insufficient funds');
      }
      await this.walletModel.updateBalance(fromWalletId, -amount, trx);
      await this.walletModel.updateBalance(toWalletId, amount, trx);
      await this.transactionModel.createTransaction(
        {
          wallet_id: fromWalletId,
          type: 'transfer',
          amount,
          recipient_account_id: toWalletId,
        },
        trx
      );
    });
  }
}

export default WalletService;
