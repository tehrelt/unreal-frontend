import { Button } from "@/components/ui/button";
import { cn, datef } from "@/lib/utils";
import { AddressInfo, Mail } from "@/schemas/mailbox";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

function From({ from }: { from: AddressInfo }) {
  return (
    <div className="flex gap-x-2 items-center">
      <span className="text-muted-foreground">Отправитель:</span>
      <span>{from.name}</span>
      <span className="text-xs text-muted-foreground  cursor-pointer hover:text-muted-foreground/80 hover:underline">
        {from.address}
      </span>
    </div>
  );
}

function To({ to }: { to: AddressInfo }) {
  return (
    <>
      <span>
        {to.name ? (
          to.name
        ) : (
          <span className="text-muted-foreground">(нет имени)</span>
        )}
      </span>
      <span className="text-xs text-muted-foreground  cursor-pointer hover:text-muted-foreground/80 hover:underline">
        {to.address}
      </span>
    </>
  );
}

function ToList({ receivers }: { receivers: AddressInfo[] }) {
  return (
    <div className="flex gap-x-2 items-center">
      <span className="text-muted-foreground">Получатель:</span>
      {receivers.map((to) => (
        <To key={to.address} to={to} />
      ))}
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
      <Info mail={mail} mailbox={mailbox} />
      <div className="text-muted-foreground">{datef(mail.sentDate)}</div>
    </div>
  );
}

function Info({ mailbox, mail }: { mailbox: string; mail: Mail }) {
  return (
    <div>
      <div className="flex items-center gap-x-2 group">
        <Back mailbox={mailbox} />
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
