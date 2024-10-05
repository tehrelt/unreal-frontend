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
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <div className="flex flex-col h-screen relative">
      <Header className={"flex-1 border-b border-b-primary-foreground"} />
      <ResizablePanelGroup direction="horizontal" className="flex-2">
        <ResizablePanel
          defaultSize={15}
          collapsedSize={3}
          collapsible={true}
          minSize={10}
          maxSize={15}
          onCollapse={() => setIsCollapsed(true)}
          onResize={() => setIsCollapsed(false)}
        >
          <Mailboxes isCollapsed={isCollapsed} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="flex-grow h-full overflow-auto">
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
