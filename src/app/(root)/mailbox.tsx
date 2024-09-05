"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MailMessage,
  MailMessageSkeleton,
} from "@/components/widgets/mail/message";
import { useMailbox } from "@/hooks/mail/use-mailbox";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react";
import { Suspense } from "react";
import { toast } from "sonner";

interface Props {
  mailbox: string;
}

export const Mailbox = ({ mailbox }: Props) => {
  const { data, isLoading, isError, refetch, isRefetching } =
    useMailbox(mailbox);

  const refresh = async () => {
    await refetch();
    toast.success("Refreshed");
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-x-2">
        <span className="text-5xl font-extrabold m-4 px-4">{mailbox}</span>
        <Button
          variant={"ghost"}
          className="py-8 px-4"
          onClick={refresh}
          disabled={isLoading || isRefetching}
        >
          <RefreshCcw size={32} />
        </Button>
      </div>
      <ScrollArea className="h-[750px] mx-4 overflow-hidden">
        <div className="space-y-2">
          {isLoading ? (
            [...Array(3)].map((m, i) => <MailMessageSkeleton key={i} />)
          ) : isError ? (
            <span>Не удалось загрузить письма</span>
          ) : (
            data &&
            data.messages.map((m) => (
              <MailMessage
                key={m.id}
                mail={m}
                link={`/mail?mailbox=${mailbox}&num=${m.id}`}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
