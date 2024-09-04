import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Mail } from "@/schemas/mailbox";
import React from "react";

type Props = {
  mail: Mail;
};

export const MailMessage = ({ mail }: Props) => {
  return (
    <div
      key={mail.id}
      className={cn(
        "border rounded-md  hover:bg-muted/70 cursor-pointer w-full py-2 px-4",
        !mail.isRead ? "bg-muted/90" : ""
      )}
    >
      <div className="flex justify-between w-full">
        <div className="flex gap-x-2">
          {!mail.isRead && <Badge>new</Badge>}
          {mail.from.name && <span>{mail.from.name}</span>}
          <div className="text-muted-foreground underline">
            {mail.from.address}
          </div>
        </div>
        <div className="text-muted-foreground">{mail.sentDate}</div>
      </div>
      {mail.subject ? (
        <div className="flex ">{mail.subject.substring(0, 100)}</div>
      ) : (
        <span className="text-muted-foreground italic">Тема отсутсвует</span>
      )}
    </div>
  );
};

export const MailMessageSkeleton = () => {
  return (
    <div
      className={cn(
        "border rounded-md  hover:bg-muted/70 cursor-pointer w-full py-2 px-4 space-y-2"
      )}
    >
      <div className="flex gap-x-2">
        <Skeleton className="w-64 h-4" />
        <Skeleton className="w-32 h-4" />
      </div>
      <Skeleton className="w-full h-8" />
    </div>
  );
};
