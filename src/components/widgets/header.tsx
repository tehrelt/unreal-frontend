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
            <span className="text-xl">
              unreal{" "}
              {health && <span>{!isHealthError && health.version} </span>}
            </span>
          </Badge>
        </Link>
        {isHealthError ? (
          <p className="text-red-500 flex gap-x-1">
            <AlertTriangle /> Сервер недоступен
          </p>
        ) : health ? (
          <p
            className={cn(
              "flex",
              health.tlsEnabled ? "text-green-500" : "text-red-500"
            )}
          >
            <Lock />
            TLS
          </p>
        ) : (
          <Skeleton className="py-1 px-2">Соединение с сервером</Skeleton>
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
