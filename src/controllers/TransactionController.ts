import { Request, Response, NextFunction } from 'express';
import Services from '../services';
import knex from '../config/db/db';
import customError from '../utils/customError';
import ResponseHandler from '../utils/responseHandler';

const transactionService = new Services.TransactionService(knex);

class TransactionController {
  public async getTransactionById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = (req as any).user.userId;
      const { transactionId } = req.params;
      const transaction = await transactionService.getTransactionById(
        parseInt(transactionId, 10),
        userId
      );
      if (!transaction) {
        throw new customError.NotFoundError('Transaction not found');
      } else {
        new ResponseHandler(res, transaction, 200, 'Transaction retrieved');
      }
    } catch (error) {
      next(error);
    }
  }

  public async getTransactionsByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = (req as any).user.userId;
      const transactions =
        await transactionService.getTransactionsByUserId(userId);
      new ResponseHandler(res, transactions, 200, 'Transactions retrieved');
    } catch (error) {
      next(error);
    }
  }

  public async getTransactionsBywalletId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = (req as any).user.userId;
      const { walletId } = req.params;
      const transactions = await transactionService.getTransactionsBywalletId(
        walletId,
        userId
      );
      new ResponseHandler(res, transactions, 200, 'Transactions retrieved');
    } catch (error) {
      next(error);
    }
  }
}

export default new TransactionController();
