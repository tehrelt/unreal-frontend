"use client";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MailMessage,
  MailMessageSkeleton,
} from "@/components/widgets/mail/message";
import { useMailbox } from "@/hooks/mail/use-mailbox";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

interface Props {
  mailbox: string;
}

export const Mailbox = ({ mailbox }: Props) => {
  const { data, isLoading, isError } = useMailbox(mailbox);

  return (
    <div className="flex flex-col ">
      <span className="text-5xl font-extrabold m-4 px-4">{mailbox}</span>
      <ScrollArea className="h-[750px] mx-4 overflow-hidden">
        <div className="space-y-2">
          {isLoading ? (
            [...Array(3)].map((m, i) => <MailMessageSkeleton key={i} />)
          ) : isError ? (
            <span>Не удалось загрузить письма</span>
          ) : (
            data &&
            data.messages.map((m) => <MailMessage key={m.id} mail={m} />)
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
