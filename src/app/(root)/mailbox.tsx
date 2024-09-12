"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
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
    <div className="mx-4 space-y-2">
      <div className="flex items-center gap-x-2 mt-2">
        <Button
          variant={"ghost"}
          className="py-8 px-4"
          onClick={refresh}
          disabled={isLoading || isRefetching}
        >
          <RefreshCcw size={32} />
        </Button>
        <span className="text-5xl font-extrabold">{mailbox}</span>
      </div>
      <ScrollArea className="h-screen overflow-hidden">
        <div className="space-y-2 flex flex-col">
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
