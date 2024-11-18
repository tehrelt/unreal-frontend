"use client";
import { API_HOST } from "@/const/env";
import { useMessage } from "@/hooks/mail/use-mail";
import { useTitle } from "@/hooks/use-title";
import { useUser } from "@/hooks/use-user";
import { useEffect } from "react";
import { AttachmentsList } from "./attachments/attachments-list";
import { MailHeader } from "./header";
import { ScrollArea } from "@/components/ui/scroll-area";
import DOMPurify from "dompurify";
import { useMailboxes } from "@/hooks/mail/use-mailboxes";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { mailService } from "@/services/mail";

type Props = {
  mailbox: string;
  num: number;
};

export function Mail({ mailbox, num }: Props) {
  const router = useRouter();
  const { data, isLoading, isError } = useMessage(mailbox, num);
  const { set: setTitle } = useTitle();
  const { data: user } = useUser();
  const { isDraft } = useMailboxes();

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

  const useDraft = async () => {
    router.replace(`/send?mailbox=${mailbox}&num=${num}`);
  };

  return (
    <div className="px-4 flex flex-col space-y-2 max-h-[calc(100vh-64px)]">
      <ScrollArea className="flex flex-col">
        {data && (
          <div className="space-y-4">
            <MailHeader mailbox={mailbox} mail={data.mail} />
            {isDraft(mailbox) && (
              <Button className="p-2 h-fit" variant={"link"} onClick={useDraft}>
                Использовать черновик
              </Button>
            )}
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
            <div className="relative">
              {data.mail.body ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(data.mail.body),
                  }}
                />
              ) : (
                <div className="text-center text-muted-foreground">
                  (Без содержимого)
                </div>
              )}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
