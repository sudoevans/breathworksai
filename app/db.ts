import { drizzle } from 'drizzle-orm/postgres-js';
import { pgTable, serial, varchar, boolean } from 'drizzle-orm/pg-core';
import { eq } from 'drizzle-orm';
import postgres from 'postgres';
import { genSaltSync, hashSync } from 'bcrypt-ts';

let client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`);
let db = drizzle(client);

export async function getUser(email: string) {
  const users = await ensureTableExists();
  return await db.select().from(users).where(eq(users.email, email));
}

export async function createUser(name: string, email: string, password: string, language: string, sayName: boolean) {
  const users = await ensureTableExists();
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);

  console.log(users)

  return await db.insert(users).values({ name, email, password: hash, language, say_name: sayName });
}

async function ensureTableExists() {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'User'
    );`;

  if (!result[0].exists) {
    await client`
      CREATE TABLE "User" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(64),
        email VARCHAR(64),
        password VARCHAR(64),
        language VARCHAR(64),
        say_name BOOLEAN
      );`;
  }

  const table = pgTable('User', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 64 }),
    email: varchar('email', { length: 64 }),
    password: varchar('password', { length: 64 }),
    language: varchar('language', { length: 64 }),
    say_name: boolean('say_name'),
  });

  return table;
}
