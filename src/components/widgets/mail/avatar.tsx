import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { API_HOST } from "@/const/env";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import React from "react";

type Props = {
  name?: string;
  src?: string;
  className?: ClassValue;
};

export const MailAvatar = ({ name, src, className }: Props) => {
  const split = name ? name.split(" ") : [];

  const display = name
    ? split.length > 1
      ? split[0][0] + split[1][0]
      : split[0][0]
    : "";

  return (
    <Avatar className={cn("", className)}>
      <AvatarImage src={`${API_HOST}${src}`} />
      <AvatarFallback>{display}</AvatarFallback>
    </Avatar>
  );
};
