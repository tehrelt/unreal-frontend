import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, datef } from "@/lib/utils";
import { Mail } from "@/schemas/mailbox";
import { useRouter } from "next/navigation";
import React from "react";
import { MailAvatar } from "./avatar";
import { Lock, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  mail: Mail;
  link?: string;
  remove: () => void;
};

export const MailMessage = ({ mail, link, remove }: Props) => {
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
      // onClick={route}
    >
      <div className="flex justify-between group">
        <div className="flex items-center gap-x-4">
          <MailAvatar name={mail.from.name} src={mail.from.picture} />
          <div className="flex flex-col">
            <div className="flex gap-x-3 items-center">
              <div className="flex gap-x-2 items-center" onClick={route}>
                {!mail.isRead && <Badge>new</Badge>}
                {mail.encrypted && <Lock className="h-4 w-4" />}
                {mail.from.name && <span>{mail.from.name}</span>}
                <div className="text-muted-foreground underline">
                  {mail.from.address}
                </div>
              </div>
              <Button
                variant={"ghost"}
                className="p-2 h-fit opacity-0 group-hover:opacity-100 transition-all duration-100 ease-in-out"
                onClick={remove}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
            <div onClick={route}>
              {mail.subject ? (
                <div className="text-ellipsis overflow-hidden max-w-[960px]">
                  {mail.subject}
                </div>
              ) : (
                <span className="text-muted-foreground">(нет темы)</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end">
          <div className="text-muted-foreground">{datef(mail.sentDate)}</div>
          <div></div>
        </div>
      </div>
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
