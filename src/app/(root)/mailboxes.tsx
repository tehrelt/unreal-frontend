import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMailboxes } from "@/hooks/mail/useMailboxes";
import { useParams } from "@/hooks/search-params";
import { mailboxIcon } from "@/lib/mbicon";
import { cn } from "@/lib/utils";
import { Mailbox } from "@/schemas/mailbox";
import { ClassValue } from "clsx";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export const MailboxLoading = () => {};

export const MailboxEntry = ({
  mailbox,
  isCollapsed = false,
  className,
  ...props
}: {
  mailbox: Mailbox;
  isCollapsed: boolean;
  icon: LucideIcon;
  className?: ClassValue;
}) => {
  const { set } = useParams();

  console.log("clll", className);

  return (
    <div
      data-collapsed={isCollapsed}
      className={cn(
        "hover:bg-muted px-2 py-2 mx-2 cursor-pointer rounded-md flex items-center gap-x-2",
        isCollapsed && "justify-center",
        className
      )}
      onClick={() => set("mailbox", mailbox.name)}
    >
      {isCollapsed ? (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild className="relative">
              <div>
                <props.icon size={24} />
                {mailbox.unreadCount != 0 && (
                  <Badge className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-2 h-4 flex justify-center">
                    {mailbox.unreadCount}
                  </Badge>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <span>
                {mailbox.unreadCount != 0 && (
                  <span>({mailbox.unreadCount}) </span>
                )}
                {mailbox.name}
              </span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <>
          <div>
            <props.icon size={24} />
          </div>
          <div className="flex justify-between w-full items-center">
            <div>{mailbox.name}</div>
            <div>
              {mailbox.unreadCount != 0 && <Badge>{mailbox.unreadCount}</Badge>}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

type Props = { isCollapsed: boolean };

export const Mailboxes = ({ isCollapsed = false }: Props) => {
  const { data } = useMailboxes();

  const pathname = usePathname();

  console.log(pathname);

  return (
    <div>
      <div className="py-2 space-y-1">
        {data &&
          data.mailboxes.map((mb) => (
            <MailboxEntry
              key={mb.name}
              mailbox={mb}
              isCollapsed={isCollapsed}
              icon={mailboxIcon(mb.attributes)}
              className={pathname.includes(mb.name) ? "bg-muted" : ""}
            />
          ))}
      </div>
    </div>
  );
};
