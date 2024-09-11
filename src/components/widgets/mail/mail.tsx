"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMail } from "@/hooks/mail/use-mail";
import { renderContentType } from "@/lib/parser";
import { cn, datef } from "@/lib/utils";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  mailbox: string;
  num: number;
};

export function Mail({ mailbox, num }: Props) {
  const { data, isError } = useMail(mailbox, num);

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="py-4 px-4 w-full">
      {data && (
        <div>
          <div className="flex justify-between">
            <div>
              <div className="flex items-center gap-x-2 group">
                <Link passHref legacyBehavior href={`/?mailbox=${mailbox}`}>
                  <Button
                    variant={"link"}
                    className="text-muted-foreground group-hover:text-primary"
                  >
                    <ChevronLeftIcon size={20} />
                  </Button>
                </Link>
                <div
                  className={cn(
                    "inline text-xl font-extrabold max-w-[1280px] line-clamp-2 text-ellipsis break-words",
                    !data.mail.subject && "text-muted-foreground"
                  )}
                >
                  {data.mail.subject ? data.mail.subject : "(нет темы)"}
                </div>
              </div>
              <div className="flex gap-x-2 items-center">
                <span className="text-muted-foreground">Отправитель:</span>
                <span>{data.mail.from.name}</span>
                <span className="text-xs text-muted-foreground  cursor-pointer hover:text-muted-foreground/80 hover:underline">
                  {data.mail.from.address}
                </span>
              </div>
              <div className="flex gap-x-2 items-center">
                <span className="text-muted-foreground">Получатель:</span>
                {data.mail.to.map((to) => (
                  <>
                    <span>
                      {to.name ? (
                        to.name
                      ) : (
                        <span className="text-muted-foreground">
                          (нет имени)
                        </span>
                      )}
                    </span>
                    <span className="text-xs text-muted-foreground  cursor-pointer hover:text-muted-foreground/80 hover:underline">
                      {to.address}
                    </span>
                  </>
                ))}
              </div>
            </div>
            <div className="text-muted-foreground">
              {datef(data.mail.sentDate)}
            </div>
          </div>
          <ScrollArea className="h-[750px] w-[1600px] scroll-m-0 break-words text-wrap">
            {data.mail.content ? (
              data.mail.content.map((part) =>
                renderContentType(part.contentType, part.body)
              )
            ) : (
              <div className="text-center text-muted-foreground">
                (Без содержимого)
              </div>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
