import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  picture: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;

export const updateUserSchema = z.object({
  name: z.string().optional(),
  file: z.instanceof(File).optional(),
});
export type UpdateUser = z.infer<typeof updateUserSchema>;
