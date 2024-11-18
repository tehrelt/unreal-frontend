"use client";

import {
  LucideIcon,
  Mail,
  MailWarning,
  Send,
  SquarePen,
  Trash,
} from "lucide-react";

export function mailboxIcon(attributes: string[]): LucideIcon {
  if (attributes.includes("\\Sent")) {
    return Send;
  } else if (attributes.includes("\\Trash")) {
    return Trash;
  } else if (attributes.includes("\\Junk") || attributes.includes("\\Spam")) {
    return MailWarning;
  } else if (attributes.includes("\\Drafts")) {
    return SquarePen;
  }
  return Mail;
}
