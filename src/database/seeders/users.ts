import { Knex } from "knex";
import hashPassword from "../../utils/hashPassword";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        { name: 'User 1', username: 'user1', email: 'user1@example.com', password: (await hashPassword('password1')) },
        { name: 'User 2', username: 'user2', email: 'user2@example.com', password: (await hashPassword('password2')) },
    ]);
};
