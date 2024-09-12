"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { API_HOST } from "@/const/env";
import { useMail } from "@/hooks/mail/use-mail";
import { useTitle } from "@/hooks/use-title";
import { useUser } from "@/hooks/useUser";
import { renderContentType } from "@/lib/parser";
import { cn, datef } from "@/lib/utils";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import Attachment from "./attachment";

type Props = {
  mailbox: string;
  num: number;
};

export function Mail({ mailbox, num }: Props) {
  const { data, isLoading, isError } = useMail(mailbox, num);
  const { set: setTitle } = useTitle();
  const { data: user } = useUser();

  useEffect(() => {
    if (data) {
      setTitle(
        user?.email +
          " / " +
          (data.mail.subject ? data.mail.subject : "(нет темы)")
      );
    }
  }, [data, user, setTitle]);

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="py-4 px-4 w-full h-screen space-y-2">
      {data && (
        <div className="space-y-4">
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
          <hr />
          <div>
            {data.mail.attachments && data.mail.attachments.length > 0 && (
              <div>
                <p className="text-muted-foreground text-lg font-bold">
                  Прикрепленные файлы
                </p>
                <div className="flex gap-x-2">
                  {data.mail.attachments.map((a) => (
                    <Attachment
                      key={a.filename}
                      attachment={a}
                      link={`${API_HOST}/attachment/${a.filename}?mailnum=${num}&mailbox=${mailbox}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <hr />
          <ScrollArea className="break-words text-wrap flex-shrink-0 h-screen">
            <div className="relative text-wrap break-words">
              {data.mail.body ? (
                <div
                  className="w-full text-wrap"
                  dangerouslySetInnerHTML={{
                    __html: data.mail.body,
                  }}
                />
              ) : (
                <div className="text-center text-muted-foreground">
                  (Без содержимого)
                </div>
              )}
            </div>
            <div className="h-[200px]"></div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
