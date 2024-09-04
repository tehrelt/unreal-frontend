"use client";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMailbox } from "@/hooks/mail/use-mailbox";
import { NextPage } from "next";

interface Props {
  params: {
    mailbox: string;
  };
}

const Page: NextPage<Props> = ({ params: { mailbox } }) => {
  const { data } = useMailbox(mailbox);

  return (
    <div className="flex flex-col">
      <span className="text-5xl font-extrabold m-4 px-4">{mailbox}</span>
      <ScrollArea className="flex flex-col space-y-4 h-[750px] mx-4">
        <div className="space-y-2">
          {data &&
            data.messages.map((m) => (
              <div
                key={m.id}
                className="flex flex-col gap-x-2 border rounded-md py-2 px-4 hover:bg-muted/70 cursor-pointer"
              >
                <span className="space-x-2">
                  {!m.isRead && <Badge>new</Badge>}
                  {m.from.name && <span>{m.from.name}</span>}
                  <span className="text-muted-foreground underline">
                    {m.from.address}
                  </span>
                </span>
                <span>
                  {m.subject ? (
                    m.subject
                  ) : (
                    <span className="text-muted-foreground italic">
                      Тема отсутсвует
                    </span>
                  )}
                </span>
              </div>
            ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Page;
