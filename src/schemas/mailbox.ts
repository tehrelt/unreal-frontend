import { z } from "zod";

export const mailboxSchema = z.object({
  name: z.string(),
  attributes: z.array(z.string()),
  unreadCount: z.number(),
});

export type Mailbox = z.infer<typeof mailboxSchema>;
