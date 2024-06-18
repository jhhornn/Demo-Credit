import { Knex } from 'knex';
import generateWalletId from '../../utils/generateWalletId';

const walletId1 = generateWalletId();
const walletId2 = generateWalletId();

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('wallets').del();

  // Inserts seed entries
  await knex('wallets').insert([
    { user_id: 1, wallet_id: walletId1, balance: 1000.0 },
    { user_id: 2, wallet_id: walletId2, balance: 1500.0 },
  ]);
}

export default {
  walletId1,
  walletId2,
};
