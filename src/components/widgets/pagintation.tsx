"use client";
import { useParams } from "@/hooks/search-params";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { set } from "zod";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";

type Props = {
  className?: ClassValue;
};

export const Limit = ({ className }: Props) => {
  const sp = useParams();
  const [limit, set] = React.useState<string | undefined>();

  React.useEffect(() => {
    const lim = sp.params.get("limit");
    if (lim) {
      const l = Number(lim);

      if (isNaN(l) || l <= 0) {
        sp.del("limit");
        return;
      }

      set(lim);
    }
  }, [limit, sp]);

  const handle = (value: string) => {
    set(value);
    sp.set("limit", value);
  };

  return (
    <Select defaultValue={"10"} value={limit} onValueChange={handle}>
      <SelectTrigger className={cn("", className)}>
        <SelectValue defaultValue={"limit"} />
      </SelectTrigger>
      <SelectContent>
        {[10, 25, 50, 100, 250].map((lim) => (
          <SelectItem key={lim} value={String(lim)}>
            {lim} писем
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
