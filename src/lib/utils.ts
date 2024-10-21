import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export type PropsWithClassname = {
  className?: ClassValue;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function datef(date: Date, format?: string): string {
  return dayjs(date).format(format ?? "DD/MM/YYYY HH:mm:ss");
}

export const decodeb64 = (str: string): string =>
  Buffer.from(str, "base64").toString("binary");

export const vemail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
