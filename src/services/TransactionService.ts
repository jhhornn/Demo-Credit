import { Knex } from 'knex';
import TransactionModel from '../models/TransactionModel.';
import { ITransaction } from '../utils/interfaces';

class TransactionService {
  private transactionModel: TransactionModel;

  constructor(knex: Knex) {
    this.transactionModel = new TransactionModel(knex);
  }

  public async createTransaction(transaction: ITransaction, trx?: Knex.Transaction): Promise<void> {
    await this.transactionModel.createTransaction(transaction, trx);
  }

  public async getTransactionById(transactionId: number, userId: string): Promise<ITransaction | null> {
    return this.transactionModel.getTransactionById(transactionId, userId);
  }

  public async getTransactionsBywalletId(walletId: string, userId: string): Promise<ITransaction[]> {
    return this.transactionModel.getTransactionsBywalletId(walletId, userId);
  }

  public async getTransactionsByUserId(userId: number): Promise<ITransaction[]> {
    return this.transactionModel.getTransactionsByUserId(userId);
  }
}

export default TransactionService;
