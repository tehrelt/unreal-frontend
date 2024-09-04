"use client";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMailbox } from "@/hooks/mail/use-mailbox";
import { cn } from "@/lib/utils";
import { NextPage } from "next";

interface Props {
  params: {
    mailbox: string;
  };
}

const Page: NextPage<Props> = ({ params: { mailbox } }) => {
  const { data } = useMailbox(mailbox);

  const mb = decodeURIComponent(mailbox);

  return (
    <div className="flex flex-col ">
      <span className="text-5xl font-extrabold m-4 px-4">{mb}</span>
      <ScrollArea className="h-[750px] mx-4 overflow-hidden">
        <div className="space-y-2 ">
          {data &&
            data.messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "border rounded-md  hover:bg-muted/70 cursor-pointer w-full py-2 px-4",
                  !m.isRead ? "bg-muted/90" : ""
                )}
              >
                <div className="flex justify-between w-full">
                  <div className="flex gap-x-2">
                    {!m.isRead && <Badge>new</Badge>}
                    {m.from.name && <span>{m.from.name}</span>}
                    <div className="text-muted-foreground underline">
                      {m.from.address}
                    </div>
                  </div>
                  <div className="text-muted-foreground">{m.sentDate}</div>
                </div>
                {m.subject ? (
                  <div className="flex ">{m.subject.substring(0, 100)}</div>
                ) : (
                  <span className="text-muted-foreground italic">
                    Тема отсутсвует
                  </span>
                )}
              </div>
            ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Page;
