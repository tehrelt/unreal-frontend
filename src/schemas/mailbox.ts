import { z } from "zod";

export const mailboxSchema = z.object({
  name: z.string(),
});

export type Mailbox = z.infer<typeof mailboxSchema>;
