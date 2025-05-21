import { z } from "zod";

export const ShoppingListSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  total: z.number().int().nonnegative(),
});

export const ShoppingItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  price: z.number().nonnegative(),
  quantity: z.number().int().nonnegative(),
});

export type ShoppingItem = z.infer<typeof ShoppingItemSchema>;
export type ShoppingList = z.infer<typeof ShoppingListSchema>;
