import { Button } from "@/components/ui/button";
import { cn, datef } from "@/lib/utils";
import { AddressInfo, Mail } from "@/schemas/mailbox";
import { ChevronDown, ChevronLeftIcon, ChevronUp } from "lucide-react";
import Link from "next/link";
import { MailAvatar } from "./avatar";
import { ClassValue } from "clsx";
import React from "react";
import Email from "./email";

function From({ from }: { from: AddressInfo }) {
  return (
    <div className="flex gap-x-2 items-center">
      <span className="text-muted-foreground">Отправитель:</span>
      {/* <span>{from.name}</span>
      <span className="text-xs text-muted-foreground  cursor-pointer hover:text-muted-foreground/80 hover:underline">
        {from.address}
      </span> */}
      <Email address={from.address} name={from.name} />
    </div>
  );
}

function To({ to }: { to: AddressInfo }) {
  return <Email address={to.address} name={to.name} />;
}

function ToList({ receivers }: { receivers: AddressInfo[] }) {
  const [collapsed, setCollapsed] = React.useState(true);

  const toggleCollapsed = () => setCollapsed(!collapsed);

  return (
    <div className="flex gap-x-2">
      <span className="text-muted-foreground">Получатель:</span>
      <div className="flex flex-col">
        {receivers.slice(0, 3).map((to) => (
          <To key={to.address} to={to} />
        ))}

        <div className="flex bg-muted rounded-md">
          {receivers.length > 3 && (
            <Button onClick={toggleCollapsed} variant={"ghost"}>
              <div className="flex items-center gap-x-1">
                {collapsed ? (
                  <>
                    <span>и ещё {receivers.length - 3} получателей</span>
                    <ChevronDown size={16} />
                  </>
                ) : (
                  <>
                    <span>Свернуть</span>
                    <ChevronUp size={16} />
                  </>
                )}
              </div>
            </Button>
          )}
          {!collapsed && (
            <div className="flex items-center px-2">
              {receivers.slice(3).map((to) => (
                <To key={to.address} to={to} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Subject({ subject }: { subject?: string }) {
  return (
    <div
      className={cn(
        "inline text-xl font-extrabold max-w-[1280px] line-clamp-2 text-ellipsis break-words",
        !subject && "text-muted-foreground"
      )}
    >
      {subject ? subject : "(нет темы)"}
    </div>
  );
}

export function MailHeader({ mailbox, mail }: { mailbox: string; mail: Mail }) {
  return (
    <div className="flex justify-between">
      <Info mail={mail} mailbox={mailbox} className="pt-2" />
      <div className="text-muted-foreground">{datef(mail.sentDate)}</div>
    </div>
  );
}

function Info({
  mailbox,
  mail,
  className,
}: {
  mailbox: string;
  mail: Mail;
  className?: ClassValue;
}) {
  return (
    <div className={cn("", className)}>
      <div className="flex items-center gap-x-2 group">
        <Back mailbox={mailbox} />
        <MailAvatar name={mail.from.name} />
        <Subject subject={mail.subject} />
      </div>
      <From from={mail.from} />
      <ToList receivers={mail.to} />
    </div>
  );
}

function Back({ mailbox }: { mailbox: string }) {
  return (
    <Link passHref legacyBehavior href={`/?mailbox=${mailbox}`}>
      <Button
        variant={"link"}
        className="text-muted-foreground group-hover:text-primary"
      >
        <ChevronLeftIcon size={20} />
      </Button>
    </Link>
  );
}
