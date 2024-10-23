"use client";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import React from "react";
import { ModeToggle } from "./toggle-theme";
import { useUser } from "@/hooks/use-user";
import LogoutButton from "./logout-button";
import { LogOut } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = { className?: ClassValue };

export const Header = ({ className }: Props) => {
  const { user } = useUser();

  return (
    <div
      className={cn(
        "w-full py-2 px-3 grid grid-cols-3 items-center",
        className
      )}
    >
      <div className="">
        <Link href={"/"}>
          <Badge className="" variant={"secondary"}>
            <span className="text-xl">unreal</span>
          </Badge>
        </Link>
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
