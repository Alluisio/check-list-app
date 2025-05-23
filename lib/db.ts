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

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS shopping_item (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      quantity INTEGER NOT NULL,
      listId TEXT NOT NULL,
      FOREIGN KEY(listId) REFERENCES shopping_list(id)
    );
  `);
}

export default db;
