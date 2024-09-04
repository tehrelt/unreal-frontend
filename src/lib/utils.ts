import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function datef(date: Date, format?: string): string {
  return dayjs(date).format(format ?? "DD/MM/YYYY HH:mm:ss");
}

