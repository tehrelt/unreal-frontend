"use client";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import React from "react";
import { ModeToggle } from "./toggle-theme";
import { useUser } from "@/hooks/use-user";
import LogoutButton from "./logout-button";
import { AlertTriangle, Lock, LogOut } from "lucide-react";
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
import { Skeleton } from "../ui/skeleton";
import { MailAvatar } from "./mail/avatar";

type Props = { className?: ClassValue };

export const Header = ({ className }: Props) => {
  const { user } = useUser();
  const {
    data: health,
    isError: isHealthError,
    isLoading: isLoadingHealth,
  } = useHealth();

  return (
    <div
      className={cn(
        "w-full py-2 px-3 grid grid-cols-3 items-center",
        className
      )}
    >
      <div className="flex items-center gap-x-2">
        <Link href={"/"}>
          <Badge
            variant={
              isHealthError
                ? "disconnected"
                : isLoadingHealth
                ? "secondary"
                : health && "connected"
            }
          >
            <div className="text-xl flex gap-x-2">
              <span>unreal</span>
              {isLoadingHealth && (
                <span className="flex gap-x-1 items-center">
                  <Skeleton className="rounded-full w-2 h-2" />
                  <Skeleton className="rounded-full w-2 h-2" />
                  <Skeleton className="rounded-full w-2 h-2" />
                </span>
              )}
              {health && <span>{!isHealthError && health.version}</span>}
            </div>
          </Badge>
        </Link>
        {isHealthError ? (
          <p className="text-red-500 flex gap-x-1">
            <AlertTriangle /> Сервер недоступен
          </p>
        ) : (
          health && (
            <p
              className={cn(
                "flex gap-x-1",
                health.tlsEnabled ? "text-green-500" : "text-red-500"
              )}
            >
              <Lock className="w-6 h-6" />
              TLS
            </p>
          )
        )}
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

        <Link passHref legacyBehavior href={"/start"}>
          <MailAvatar name={user?.name!} src={user?.picture} />
        </Link>
        <LogoutButton variant={"ghost"}>
          <LogOut size={16} />
        </LogoutButton>
        <ModeToggle />
      </div>
    </div>
  );
};
