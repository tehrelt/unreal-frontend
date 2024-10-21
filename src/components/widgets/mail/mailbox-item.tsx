"use client";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Mailbox } from "@/schemas/mailbox";
import { ClassValue } from "clsx";
import { LucideIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

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
  const router = useRouter();
  const params = useSearchParams();

  const set = (key: string, value: string) => {
    const p = new URLSearchParams(params);
    p.set(key, value);
    router.push(`/?${p.toString()}`);
  };

  const activeMailbox = params.get("mailbox");

  return (
    <div
      data-collapsed={isCollapsed}
      className={cn(
        "hover:bg-muted cursor-pointer rounded-md flex items-center gap-x-2",
        isCollapsed && "justify-center",
        activeMailbox === mailbox.name && "bg-muted",
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
            <div className="flex flex-col">
              <span>{mailbox.name}</span>
              {/* <div className="flex flex-wrap gap-x-2">
                {mailbox.attributes.map((attr) => (
                  <Badge key={attr} className="text-xs p-0 px-1">
                    {attr}
                  </Badge>
                ))}
              </div> */}
            </div>
            <div>
              {mailbox.unreadCount != 0 && <Badge>{mailbox.unreadCount}</Badge>}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export const MailboxEntrySkeleton = ({
  isCollapsed = false,
}: {
  isCollapsed: boolean;
}) => {
  return (
    <div
      data-collapsed={isCollapsed}
      className={cn(
        "hover:bg-muted px-2 py-2 mx-2 cursor-pointer rounded-md flex items-center gap-x-2",
        isCollapsed && "justify-center"
      )}
    >
      {isCollapsed ? (
        <Skeleton className="w-8 h-8" />
      ) : (
        <div className="flex items-center gap-x-2">
          <Skeleton className="w-8 h-8" />
          <Skeleton className="w-28 h-4" />
        </div>
      )}
    </div>
  );
};
