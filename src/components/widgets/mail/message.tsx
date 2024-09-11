import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, datef } from "@/lib/utils";
import { Mail } from "@/schemas/mailbox";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  mail: Mail;
  link?: string;
};

export const MailMessage = ({ mail, link }: Props) => {
  const router = useRouter();

  const route = () => {
    if (link) {
      router.push(link);
    }
  };

  return (
    <div
      key={mail.id}
      className={cn(
        "border rounded-md  hover:bg-muted/70 cursor-pointer w-full py-2 px-4",
        !mail.isRead ? "bg-muted/90" : ""
      )}
      onClick={route}
    >
      <div className="flex justify-between w-full">
        <div className="flex gap-x-2">
          {!mail.isRead && <Badge>new</Badge>}
          {mail.from.name && <span>{mail.from.name}</span>}
          <div className="text-muted-foreground underline">
            {mail.from.address}
          </div>
        </div>
        <div className="text-muted-foreground">{datef(mail.sentDate)}</div>
      </div>
      {mail.subject ? (
        <div className="text-ellipsis overflow-hidden max-w-[960px]">
          {mail.subject}
        </div>
      ) : (
        <span className="text-muted-foreground">(нет темы)</span>
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
