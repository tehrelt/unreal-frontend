import { z } from "zod";

export const connectionSchema = z.object({
  host: z.string(),
  port: z.number(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  imap: connectionSchema,
  smtp: connectionSchema,
});

export const credentialsSchema = loginSchema.omit({
  password: true,
  imap: true,
  smtp: true,
});

export const loginResponeSchema = z.object({
  token: z.string(),
  firstLogon: z.boolean(),
});

export type LoginDto = z.infer<typeof loginSchema>;
export type LoginResponseDto = z.infer<typeof loginResponeSchema>;
export type Credential = z.infer<typeof credentialsSchema>;

export type Connection = {
  host: string;
  port: number;
};

export type Login = {
  email: string;
  password: string;
  imap: Connection;
  smtp: Connection;
};
