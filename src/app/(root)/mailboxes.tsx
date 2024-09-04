import { Badge } from "@/components/ui/badge";
import { useMailboxes } from "@/hooks/mail/useMailboxes";
import { useParams } from "@/hooks/searchParams";
import { mailboxIcon } from "@/lib/mbicon";
import { Mailbox } from "@/schemas/mailbox";
import { Icon, LucideIcon } from "lucide-react";
import React from "react";

type Props = {};

export const MailboxLoading = () => {};

export const MailboxEntry = ({
  mailbox,
  ...props
}: {
  mailbox: Mailbox;
  icon: LucideIcon;
}) => {
  const { set, del } = useParams();

  return (
    <div
      className="hover:bg-muted px-2 py-1 mx-2 cursor-pointer rounded-md flex items-center gap-x-2 "
      onClick={() => set("inbox", mailbox.name)}
    >
      <div>
        <props.icon size={24} />
      </div>
      <div>
        {mailbox.name}
        <div className="space-x-1">
          {mailbox.attributes.map((m) => (
            <Badge key={m}>{m}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Mailboxes = ({}: Props) => {
  const { data } = useMailboxes();

  return (
    <div>
      <div className="py-2 space-y-1">
        {data &&
          data.mailboxes.map((mb) => (
            <MailboxEntry
              key={mb.name}
              mailbox={mb}
              icon={mailboxIcon(mb.attributes)}
            />
          ))}
      </div>
    </div>
  );
};
