import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('transactions', (table) => {
      table.increments('transaction_id').primary();
      table.string('wallet_id').notNullable();
      table.enu('type', ['fund', 'transfer', 'withdraw']).notNullable();
      table.decimal('amount', 15, 2).notNullable();
      table.string('recipient_account_id').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
  
      table.foreign('wallet_id').references('wallet_id').inTable('wallets').onDelete('CASCADE');
    });
  }
  
  export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('transactions');
  }

