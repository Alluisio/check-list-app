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
  const validatedList = ShoppingListSchema.parse({
    id: listId,
    title,
    total: itens.length,
  });

  await db.withExclusiveTransactionAsync(async (tx) => {
    await tx.runAsync("INSERT INTO shopping_list (id, title, total) VALUES (?, ?, ?)", [
      validatedList.id,
      validatedList.title,
      validatedList.total,
    ]);

    for (const item of itens) {
      const itemValidated = ShoppingItemSchema.parse({
        ...item,
        id: v4(),
      });

      await tx.runAsync("INSERT INTO shopping_item (id, name, price, quantity, listId) VALUES (?, ?, ?, ?, ?)", [
        itemValidated.id,
        itemValidated.name,
        itemValidated.price,
        itemValidated.quantity,
        listId,
      ]);
    }
  });
}
