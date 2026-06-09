import { z } from "zod";

export const TranslateSchema = z.object({
  text: z.string().min(1).max(5000),
  source: z.string().optional(),
  target: z.string().min(2).max(5)
});

export type TranslateRequest = z.infer<typeof TranslateSchema>;