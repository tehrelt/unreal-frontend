"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MailMessage,
  MailMessageSkeleton,
} from "@/components/widgets/mail/message";
import { useMailbox } from "@/hooks/mail/use-mailbox";
import { RefreshCcw } from "lucide-react";
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
    <div className="pt-2 mx-4 space-y-2 flex flex-col max-h-[calc(100vh-52px)] pb-6">
      <div className="flex items-center gap-x-2">
        <Button
          variant={"ghost"}
          className="py-8 px-4"
          onClick={refresh}
          disabled={isLoading || isRefetching}
        >
          <RefreshCcw size={32} />
        </Button>
        <Badge className="rounded-lg px-4 py-2" variant={"secondary"}>
          <div className="flex gap-x-2 items-center w-full h-full">
            <span className="text-5xl font-extrabold">{mailbox}</span>
            {isLoading || isRefetching ? (
              <Skeleton className="h-6 w-6 rounded-full bg-primary-foreground" />
            ) : (
              <span className="text-2xl">14</span>
            )}
          </div>
        </Badge>
      </div>

      <ScrollArea className="flex flex-col">
        <div className="space-y-2">
          {isLoading || isRefetching ? (
            [...Array(7)].map((m, i) => <MailMessageSkeleton key={i} />)
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
