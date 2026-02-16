import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  description: z
    .string()
    .min(10, "A descrição deve ter no mínimo 10 caracteres")
    .optional(),
  price: z.number().positive("O preço deve ser um valor positivo"),
  categoryId: z.string().uuid("ID da categoria inválido"),
  imageUrl: z.string().url("URL inválida").optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
