import {
  MailboxEntry,
  MailboxEntrySkeleton,
} from "@/components/widgets/mail/mailbox-item";
import { useMailboxes } from "@/hooks/mail/use-mailboxes";
import { mailboxIcon } from "@/lib/mbicon";

export const MailboxLoading = () => {};

type Props = { isCollapsed: boolean };

export const Mailboxes = ({ isCollapsed = false }: Props) => {
  const { data, isLoading, isError } = useMailboxes();

  return (
    <div>
      <div className="py-2 space-y-1">
        {isLoading ? (
          [...Array(4)].map((_, i) => (
            <MailboxEntrySkeleton key={i} isCollapsed={isCollapsed} />
          ))
        ) : isError ? (
          <div>error with loading</div>
        ) : (
          data &&
          data.mailboxes.map((mb) => (
            <MailboxEntry
              key={mb.name}
              mailbox={mb}
              isCollapsed={isCollapsed}
              icon={mailboxIcon(mb.attributes)}
              className="py-1 px-1"
            />
          ))
        )}
      </div>
    </div>
  );
};
