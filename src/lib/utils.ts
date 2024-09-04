import { clsx, type ClassValue } from "clsx";
import {
  IconNode,
  LucideIcon,
  Mail,
  MailWarning,
  Send,
  Trash,
} from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

