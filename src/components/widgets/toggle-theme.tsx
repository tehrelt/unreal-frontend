"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Toggle } from "../ui/toggle";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Toggle
      pressed={theme === "dark"}
      onPressedChange={(pressed) => setTheme(pressed ? "dark" : "light")}
    >
      {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
    </Toggle>
  );
}
