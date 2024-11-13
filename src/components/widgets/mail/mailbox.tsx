"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MailMessage,
  MailMessageSkeleton,
} from "@/components/widgets/mail/message";
import { RefreshCcw } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { useInfiniteQuery } from "@tanstack/react-query";
import { mailService } from "@/services/mail";
import { useIntersection } from "@/hooks/useIntersection";
import { useUser } from "@/hooks/use-user";

interface Props {
  mailbox: string;
}

export const Mailbox = ({ mailbox }: Props) => {
  const { data: user } = useUser();

  const {
    data: messages,
    refetch,
    isRefetching,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["messages", { email: user?.email, mailbox }],
    queryFn: (meta) =>
      mailService.messages({
        mailbox: encodeURIComponent(mailbox),
        page: meta.pageParam,
        limit: 10,
      }),
    initialPageParam: 1,
    getNextPageParam: (res) => res.hasNext,
    select: (res) => res.pages.map((p) => p.messages).flat(),
  });

  const cursorRef = useIntersection(() => {
    fetchNextPage();
  });

  const refresh = async () => {
    await refetch();
    toast.success("Refreshed");
  };

  return (
    <div className="pt-2 mx-4 space-y-2 flex flex-col max-h-[calc(100vh-72px)] pb-6">
      <div className="flex justify-between items-end">
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
              {isLoading ||
                (isRefetching && (
                  <Skeleton className="h-6 w-6 rounded-full bg-primary-foreground" />
                ))}
            </div>
          </Badge>
        </div>
      </div>

      <ScrollArea className="flex flex-col">
        <div className="space-y-2">
          {isLoading ? (
            [...Array(7)].map((_, i) => <MailMessageSkeleton key={i} />)
          ) : isError ? (
            <span>Не удалось загрузить письма</span>
          ) : (
            messages &&
            messages.map((m) => (
              <MailMessage
                key={m.id}
                mail={m}
                link={`/mail?mailbox=${mailbox}&num=${m.id}`}
              />
            ))
          )}
        </div>
        <div
          ref={cursorRef}
          className="flex justify-center text-muted-foreground my-2"
        >
          {!hasNextPage && !isLoading && (
            <span>Вы достигли конца списка писем</span>
          )}
          {isFetchingNextPage && (
            <Skeleton className="px-2 py-1">
              Загрузка следующей страницы
            </Skeleton>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
