import { Knex } from 'knex';
import { ITransaction } from '../utils/interfaces';
import customError from '../utils/customError';

class TransactionModel {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  public async createTransaction(transaction: ITransaction, trx?: Knex.Transaction): Promise<void> {
    const query = this.knex('transactions').insert(transaction);
    if (trx) {
      await query.transacting(trx);
    } else {
      await query;
    }
  }

  public async getTransactionById(transactionId: number, userId: string): Promise<ITransaction | null> {
    const user = await this.knex('users').where({ user_id: userId }).first();
    if (!user) {
      throw new customError.UnAuthorizedError('You cannot view this transaction')
    }
    const transaction = await this.knex('transactions')
    .join('wallets', 'transactions.wallet_id', 'wallets.wallet_id')
    .where({
      'transactions.transaction_id': transactionId,
      'wallets.user_id': userId
    })
    .select('transactions.*')
    .first();

  if (!transaction) {
    throw new customError.NotFoundError('Transaction not found');
  }
    return transaction || null;
  }

  public async getTransactionsBywalletId(walletId: string, userId: string): Promise<ITransaction[]> {
    const wallet = await this.knex('wallets').where({ wallet_id: walletId }).first();
    if (!wallet) {
      throw new customError.NotFoundError('Wallet not found')
    }
    const transactions = await this.knex('transactions')
    .join('wallets', 'transactions.wallet_id', 'wallets.wallet_id')
    .where({
      'transactions.wallet_id': walletId,
      'wallets.user_id': userId
    })
    .select('transactions.*');

  if (transactions.length === 0) {
    throw new customError.UnAuthorizedError('You are not authorised to check this wallet');
  }

  return transactions;
  }

  public async getTransactionsByUserId(userId: number): Promise<ITransaction[]> {
    const transactions = await this.knex<ITransaction>('transactions')
      .join('wallets', 'transactions.wallet_id', 'wallets.wallet_id')
      .where('wallets.user_id', userId)
      .select('transactions.*');

    if (transactions.length === 0) {
      throw new customError.NotFoundError('Transaction not found');
    }
    return transactions;
  }
}

export default TransactionModel;
