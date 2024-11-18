import { Button } from "@/components/ui/button";
import { cn, datef, PropsWithClassname } from "@/lib/utils";
import { AddressInfo, Mail } from "@/schemas/mailbox";
import {
  ChevronDown,
  ChevronLeftIcon,
  ChevronUp,
  Lock,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { MailAvatar } from "./avatar";
import { ClassValue } from "clsx";
import React from "react";
import Email from "./email";
import { useMutation } from "@tanstack/react-query";
import { mailService } from "@/services/mail";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function From({ from, className }: { from: AddressInfo } & PropsWithClassname) {
  return (
    <div className="flex gap-x-2 items-center">
      <span className="text-muted-foreground">Отправитель:</span>
      <Email info={from} />
    </div>
  );
}

function To({ to, className }: { to: AddressInfo } & PropsWithClassname) {
  return <Email info={to} />;
}

function ToList({ receivers }: { receivers: AddressInfo[] }) {
  const [collapsed, setCollapsed] = React.useState(true);

  const toggleCollapsed = () => setCollapsed(!collapsed);

  return (
    <div className="flex gap-x-2">
      <span className="text-muted-foreground">Получатель:</span>
      <div className="space-y-1">
        <div className="flex flex-wrap gap-x-1">
          {receivers.slice(0, 3).map((to) => (
            <To key={to.address} to={to} />
          ))}
        </div>
        <div className="flex">
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
          <div className="flex  rounded-md">
            {!collapsed && (
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 px-2 max-w-lg">
                {receivers.slice(3).map((to) => (
                  <To key={to.address} to={to} />
                ))}
              </div>
            )}
          </div>
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

export function MailActions({
  mailbox,
  mail,
}: {
  mailbox: string;
  mail: Mail;
}) {
  const router = useRouter();

  const { mutate: remove } = useMutation({
    mutationKey: [`remove-message`, mail.id],
    mutationFn: async () => await mailService.delete(mailbox, Number(mail.id)),
    onSuccess: () => {
      toast.success("Письмо удалено");
      router.back();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="flex justify-between">
      <Button
        className="p-2 h-fit"
        onClick={async () => await remove()}
        variant={"ghost"}
      >
        <Trash className="w-4 h-4" />
      </Button>
    </div>
  );
}

export function MailHeader({ mailbox, mail }: { mailbox: string; mail: Mail }) {
  return (
    <div className="flex justify-between">
      <Info mail={mail} mailbox={mailbox} className="pt-2" />
      <div className="flex flex-col justify-between items-end">
        <div className="text-muted-foreground">{datef(mail.sentDate)}</div>
        {mail.encrypted && (
          <div className="text-green-500 flex items-center">
            <Lock />
            Сообщение зашифровано
          </div>
        )}
      </div>
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
        <MailAvatar name={mail.from.name} src={mail.from.picture} />
        <Subject subject={mail.subject} />
        <MailActions mail={mail} mailbox={mailbox} />
      </div>
      <div className="space-y-1">
        <From from={mail.from} />
        <ToList receivers={mail.to} />
      </div>
      <div></div>
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
