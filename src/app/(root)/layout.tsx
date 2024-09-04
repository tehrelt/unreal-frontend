"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Header } from "@/components/widgets/header";
import React from "react";
import { Mailboxes } from "./mailboxes";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-col h-screen">
      <Header className={"flex-1"} />
      <ResizablePanelGroup direction="horizontal" className="flex-2 border">
        <ResizablePanel>
          <Mailboxes />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel></ResizablePanel>
      </ResizablePanelGroup>
      {children}
    </div>
  );
}
