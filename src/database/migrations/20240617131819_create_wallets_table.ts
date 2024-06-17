import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('wallets', (table) => {
      table.string('wallet_id').primary();
      table.integer('user_id').unsigned().notNullable();
      table.decimal('balance', 15, 2).defaultTo(0.00);
      table.timestamp('created_at').defaultTo(knex.fn.now());
  
      table.foreign('user_id').references('user_id').inTable('users').onDelete('CASCADE');
    });
  }
  
  export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('wallets');
  }

