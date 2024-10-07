import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import React from "react";

type Props = {
  name: string;
  className?: ClassValue;
};

export const MailAvatar = ({ name, className }: Props) => {
  const split = name.split(" ");

  const display = split.length > 1 ? split[0][0] + split[1][0] : split[0][0];

  return (
    <Avatar className={cn("", className)}>
      <AvatarFallback>{display}</AvatarFallback>
    </Avatar>
  );
};
