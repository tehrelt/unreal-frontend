import { z } from "zod";

export const mailboxSchema = z.object({
  name: z.string(),
  attributes: z.array(z.string()),
  unreadCount: z.number(),
});
export type Mailbox = z.infer<typeof mailboxSchema>;

export const fromSchema = z.object({
  name: z.string(),
  address: z.string(),
});

export const mailSchema = z.object({
  id: z.string(),
  from: fromSchema,
  subject: z.string(),
  sentDate: z.date(),
  isRead: z.boolean(),
});
export type Mail = z.infer<typeof mailSchema>;
