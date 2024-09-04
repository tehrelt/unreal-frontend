import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email(),
  host: z.string(),
});

export type User = z.infer<typeof userSchema>;
