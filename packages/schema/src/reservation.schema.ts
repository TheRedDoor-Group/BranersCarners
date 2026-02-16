import { z } from "zod";

export const createReservationSchema = z.object({
  customerName: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  customerEmail: z.string().email("E-mail inválido"),
  customerPhone: z.string().min(10, "Telefone Inválido"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Hora inválida"),
  peopleCount: z.number().min(1).max(20, "Máximo de 20 pessoas"),
  unitId: z.string().uuid("ID da unidade inválido"),
});

export type CreateReservationInput = z.infer<typeof createReservationSchema>;
