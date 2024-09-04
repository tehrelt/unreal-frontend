"use client";

import { Header } from "@/components/widgets/header";
import React from "react";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
