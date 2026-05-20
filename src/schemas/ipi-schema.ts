import { z } from "zod";

export const ipiCalculationSchema = z.object({
  productValue: z.number().positive("productValue deve ser maior que zero"),
  ipiRate: z
    .number()
    .min(0, "ipiRate nao pode ser negativo")
    .max(1, "ipiRate deve ser informado em decimal, entre 0 e 1"),
});

export type IpiCalculationInput = z.infer<typeof ipiCalculationSchema>;
