import { z } from "zod";

export const mailboxSchema = z.object({
  name: z.string(),
  attributes: z.array(z.string()),
  unreadCount: z.number(),
});
export type Mailbox = z.infer<typeof mailboxSchema>;

export const addressSchema = z.object({
  name: z.string(),
  address: z.string(),
});

export const bodySchema = z.object({
  contentType: z.string(),
  body: z.string(),
});

export type BodyInfo = z.infer<typeof bodySchema>;

export const mailSchema = z.object({
  id: z.string(),
  to: z.array(addressSchema),
  from: addressSchema,
  subject: z.string(),
  sentDate: z.date(),
  isRead: z.boolean(),
  content: z.array(bodySchema),
});
export type Mail = z.infer<typeof mailSchema>;
