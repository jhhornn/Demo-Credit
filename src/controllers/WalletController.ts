import { Request, Response, NextFunction } from 'express';
import ResponseHandler from '../utils/responseHandler';
import knex from '../config/db/db';
import Services from '../services';
import customError from '../utils/customError';


const walletService = new Services.WalletService(knex);

class WalletController {
  public async fundWallet(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = (req as any).user.userId;
      const { amount } = req.body;
      const wallet = await walletService.getWalletByUserId(userId);
      if (!wallet) {
        throw new Error('Wallet not found');
      }
      await walletService.fundWallet(wallet.wallet_id, amount);
      new ResponseHandler(res, { message: `${amount} has been deposited into your wallet` }, 200, 'Wallet funded successfully');
    } catch (error) {
      next(error);
    }
  }

  public async withdraw(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = (req as any).user.userId;
      const { amount } = req.body;
      const wallet = await walletService.getWalletByUserId(userId);
      if (!wallet) {
        throw new customError.BadRequestError('Wallet not found');
      }
      await walletService.withdraw(wallet.wallet_id, amount);
      new ResponseHandler(res, { message: `Withdrawal of ${amount} successful` }, 200, 'Withdrawal successful');
    } catch (error) {
      next(error);
    }
  }

  public async transfer(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = (req as any).user.userId;
      const { toWalletId, amount } = req.body;
      const wallet = await walletService.getWalletByUserId(userId);
      if (!wallet) {
        throw new customError.BadRequestError('Wallet not found');
      }
      await walletService.transfer(wallet.wallet_id, toWalletId, amount);
      new ResponseHandler(res, { message: `Transfer of ${amount} successful` }, 200, 'Transfer successful');
    } catch (error) {
      next(error);
    }
  }

  public async getWallet(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
    const userId = (req as any).user.userId;
    const wallet = await walletService.getWalletByUserId(userId);
    new ResponseHandler(res, wallet, 200, 'Wallet retrieved successfully');
  } catch (error) {
    next(error);
    }
  }
}

export default new WalletController();
