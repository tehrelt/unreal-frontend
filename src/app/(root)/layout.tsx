"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Header } from "@/components/widgets/header";
import React from "react";
import { Mailboxes } from "./mailboxes";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
          <div className="flex flex-col px-4">
            <Link passHref legacyBehavior href={"/send"}>
              <Button>
                {isCollapsed ? (
                  <TooltipProvider>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger>
                        <Pencil className="w-4" />
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <span>Написать письмо</span>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <div className="flex gap-x-1">
                    <span>Написать</span>
                    <Pencil className="w-4" />
                  </div>
                )}
              </Button>
            </Link>
            <Mailboxes isCollapsed={isCollapsed} />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="flex-grow h-full overflow-auto">
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
