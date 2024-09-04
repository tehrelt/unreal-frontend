import { z } from "zod";

export const mailboxSchema = z.object({
  name: z.string(),
  attributes: z.array(z.string()),
});

export type Mailbox = z.infer<typeof mailboxSchema>;
