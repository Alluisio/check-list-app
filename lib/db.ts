import { openDatabaseSync } from "expo-sqlite";

const db = openDatabaseSync("shopping.db");

export async function setupDatabase() {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS shopping_list (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      total INTEGER NOT NULL
    );
  `);
}

export default db;
