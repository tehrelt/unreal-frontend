"use client";
import { Button } from "@/components/ui/button";
import { useMail } from "@/hooks/mail/use-mail";
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
    <div className="py-4 px-4">
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
                <div className="text-2xl font-extrabold">
                  {data.mail.subject}
                </div>
              </div>
              <div className="flex gap-x-2 items-center">
                <span className="text-muted-foreground">Отправитель:</span>
                <span>{data.mail.from.name}</span>
                <span className="text-xs text-muted-foreground  cursor-pointer hover:text-muted-foreground/80 hover:underline">
                  {data.mail.from.address}
                </span>
              </div>
            </div>
            <div className="text-muted-foreground">{data.mail.sentDate}</div>
          </div>
          <div
            className="px-2 py-2"
            dangerouslySetInnerHTML={{ __html: data.mail.body }}
          ></div>
        </div>
      )}
    </div>
  );
}
