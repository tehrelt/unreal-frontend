"use client";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import React from "react";
import { ModeToggle } from "./toggle-theme";
import { useUser } from "@/hooks/useUser";
import LogoutButton from "./logout-button";
import { LogOut } from "lucide-react";

type Props = { className?: ClassValue };

export const Header = ({ className }: Props) => {
  const { user } = useUser();

  return (
    <div className={cn("w-full flex justify-between py-2 px-3", className)}>
      <div></div>
      <div></div>
      <div className="flex items-center gap-x-2">
        <div>{user?.email}</div>
        <LogoutButton variant={"ghost"}>
          <LogOut size={16} />
        </LogoutButton>
        <ModeToggle />
      </div>
    </div>
  );
};
