import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { AddressInfo } from "@/schemas/mailbox";
import Link from "next/link";
import React from "react";
import { MailAvatar } from "./avatar";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

type Props = {
  info: AddressInfo;
};

const Email = ({ info: { name, address, picture } }: Props) => {
  return (
    <div className="flex items-center gap-x-1 rounded-md bg-muted px-2 py-1">
      {picture && (
        <Avatar className="w-6 h-6">
          <AvatarImage src={picture} className="w-8" />
        </Avatar>
      )}
      <HoverCard>
        <HoverCardTrigger>
          <Link className="space-x-2" href={`/send?to=${address}`} passHref>
            <span>{name}</span>
            <span className="text-xs text-muted-foreground  cursor-pointer hover:text-muted-foreground/80 hover:underline">
              {address}
            </span>
          </Link>
        </HoverCardTrigger>
        <HoverCardContent side="right" className="py-4">
          <div className="flex items-center gap-x-4">
            <MailAvatar name={name} src={picture} className="w-14 h-14" />
            <div className="flex flex-col gap-y-2">
              <div>
                <p className="">{name}</p>
                <p className="text-xs text-muted-foreground">{address}</p>
              </div>
              <div className="">
                <Link href={`/send?to=${address}`} passHref legacyBehavior>
                  <Button className="px-2 m-0 h-6 text-sm">
                    <span>Написать</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default Email;
