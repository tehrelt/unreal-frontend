"use client";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import React from "react";
import { ModeToggle } from "./toggle-theme";
import { useUser } from "@/hooks/use-user";
import LogoutButton from "./logout-button";
import { Lock, LogOut } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useHealth } from "@/hooks/use-health";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type Props = { className?: ClassValue };

export const Header = ({ className }: Props) => {
  const { user } = useUser();
  const { data: serverInfo } = useHealth();

  return (
    <div
      className={cn(
        "w-full py-2 px-3 grid grid-cols-3 items-center",
        className
      )}
    >
      <div className="flex items-center gap-x-2">
        <Link href={"/"}>
          <Badge className="" variant={"secondary"}>
            <span className="text-xl">
              unreal {serverInfo && <span>{serverInfo.version} </span>}
            </span>
          </Badge>
        </Link>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger>
              <Lock
                className={cn(
                  serverInfo.tlsEnabled ? "text-green-500" : "text-red-500"
                )}
              />
            </TooltipTrigger>
            <TooltipContent side="right">
              {serverInfo.tlsEnabled ? "TLS Включен" : "TLS Выключен"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div></div>
      <div className="flex items-center gap-x-2 justify-end">
        {user?.name ? (
          <div className="flex flex-col text-end">
            <span>{user?.name}</span>
            <span className="text-muted-foreground">{user?.email}</span>
          </div>
        ) : (
          <div>
            <span>{user?.email}</span>
          </div>
        )}

        <Avatar>
          <AvatarImage src={user?.picture}></AvatarImage>
          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <LogoutButton variant={"ghost"}>
          <LogOut size={16} />
        </LogoutButton>
        <ModeToggle />
      </div>
    </div>
  );
};
