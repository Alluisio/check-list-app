import { z } from "zod";

export const ShoppingListSchema = z.object({
  id: z.string(),
  title: z.string().min(1, { message: "O nome da lista é obrigatório." }),
  total: z
    .number({ invalid_type_error: "Total deve ser um número." })
    .int({ message: "Total deve ser um número inteiro." })
    .nonnegative({ message: "Total não pode ser negativo." }),
});

export const ShoppingItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "O nome do produto é obrigatório." }),
  price: z
    .number({ invalid_type_error: "Preço deve ser do tipo numérico." })
    .nonnegative({ message: "O preço não pode ser negativo." }),
  quantity: z
    .number({ invalid_type_error: "Quantidade deve ser um número." })
    .int({ message: "Quantidade deve ser um número inteiro." })
    .nonnegative({ message: "Quantidade não pode ser negativo." }),
});

export type ShoppingItem = z.infer<typeof ShoppingItemSchema>;
export type ShoppingList = z.infer<typeof ShoppingListSchema>;
