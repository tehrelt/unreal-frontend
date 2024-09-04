import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  host: z.string(),
  port: z.number(),
});

export const loginResponeSchema = z.object({
  token: z.string(),
});

export type LoginDto = z.infer<typeof loginSchema>;
export type LoginResponseDto = z.infer<typeof loginResponeSchema>;
