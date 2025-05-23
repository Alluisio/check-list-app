import { v4 } from "uuid";
import db from "./db";
import { ShoppingItem, ShoppingItemSchema, ShoppingList, ShoppingListSchema } from "./schema";

export async function getAllLists(): Promise<ShoppingList[]> {
  const result = await db.getAllAsync("SELECT * FROM shopping_list");

  return result.map((item) => ShoppingListSchema.parse(item));
}

export async function deleteList(id: string): Promise<void> {
  await db.runAsync("delete from shopping_list where id=?", [id]);
}

export async function createList(title: string, itens: Partial<ShoppingItem>[]) {
  const listId = v4();
  const validated = ShoppingListSchema.parse({
    id: listId,
    title,
    total: itens.length,
  });

  await db.runAsync("INSERT INTO shopping_list (id, title, total) VALUES (?, ?, ?)", [
    validated.id,
    validated.title,
    validated.total,
  ]);

  for (const item of itens) {
    const itemValidted = ShoppingItemSchema.parse({
      ...item,
      id: v4(),
    });

    await db.runAsync("INSERT INTO shopping_item (id, name, price, quantity, listId) VALUES (?, ?, ?, ?, ?)", [
      itemValidted.id,
      itemValidted.name,
      itemValidted.price,
      itemValidted.quantity,
      listId,
    ]);
  }
}
