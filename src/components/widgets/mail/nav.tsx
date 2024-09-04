import { Mailbox } from "@/schemas/mailbox";
import React from "react";

type Props = {
  mailboxes: Mailbox[];
};

export function MailNav({ mailboxes }: Props) {
  return (
    <div>
      {mailboxes.map((m) => (
        <div key={m.name}>{m.name}</div>
      ))}
    </div>
  );
}
