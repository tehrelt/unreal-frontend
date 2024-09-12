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

export const attachmentSchema = z.object({
  contentType: z.string(),
  filename: z.string(),
  contentId: z.string(),
});

export type AttachmentInfo = z.infer<typeof attachmentSchema>;

export const mailSchema = z.object({
  id: z.string(),
  to: z.array(addressSchema),
  from: addressSchema,
  subject: z.string(),
  sentDate: z.date(),
  isRead: z.boolean(),
  body: z.string(),
  attachments: z.array(attachmentSchema),
});
export type Mail = z.infer<typeof mailSchema>;
