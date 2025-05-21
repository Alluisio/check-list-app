import { v4 } from "uuid";
import db from "./db";
import { ShoppingList, ShoppingListSchema } from "./schema";

export async function getAllLists(): Promise<ShoppingList[]> {
  const result = await db.getAllAsync("SELECT * FROM shopping_list");

  return result.map((item) => ShoppingListSchema.parse(item));
}

export async function createList(item: Partial<ShoppingList>): Promise<void> {
  const validated = ShoppingListSchema.parse({
    ...item,
    id: v4(),
  });

  await db.runAsync("INSERT INTO shopping_list (id, title, total) VALUES (?, ?, ?)", [
    validated.id,
    validated.title,
    validated.total,
  ]);
}

export async function deleteList(id: string): Promise<void> {
  await db.runAsync("delete from shopping_list where id=?", [id]);
}

// export async function getAllItems(): Promise<ShoppingItem[]> {
//   const result = await db.getAllAsync("SELECT * FROM shopping_list");

//   return result.map((item) => ShoppingItemSchema.parse(item));
// }

// export async function addItem(item: ShoppingItem): Promise<void> {
//   const validated = ShoppingItemSchema.parse(item);

//   await db.runAsync("INSERT INTO shopping_list (id, name, price, quantity) VALUES (?, ?, ?, ?)", [
//     validated.id,
//     validated.name,
//     validated.price,
//     validated.quantity,
//   ]);
// }
