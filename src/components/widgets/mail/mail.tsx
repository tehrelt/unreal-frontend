"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { API_HOST } from "@/const/env";
import { useMail } from "@/hooks/mail/use-mail";
import { useTitle } from "@/hooks/use-title";
import { useUser } from "@/hooks/useUser";
import React, { useEffect } from "react";
import Attachment from "./attachments/attachment";
import { MailHeader } from "./header";
import { AttachmentsList } from "./attachments/attachments-list";

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
          <MailHeader mailbox={mailbox} mail={data.mail} />
          {data.mail.attachments && data.mail.attachments.length > 0 && (
            <>
              <hr />
              <AttachmentsList
                attachments={data.mail.attachments}
                link={(filename) =>
                  `${API_HOST}/attachment/${filename}?mailnum=${num}&mailbox=${mailbox}`
                }
              />
            </>
          )}
          <hr />
          <ScrollArea className="break-words text-wrap">
            <div className="relative text-wrap break-words">
              {data.mail.body ? (
                <div
                  className=""
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
