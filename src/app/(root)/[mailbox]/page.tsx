"use client";
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
      <div className="flex flex-col gap-y-2">
        {data &&
          data.messages.map((m) => (
            <div
              key={m.id}
              className="flex flex-col gap-x-2 border rounded-md py-2 px-4 hover:bg-muted/70 cursor-pointer"
            >
              <span className="underline">{m.from}</span>
              <span>
                {m.subject ?? (
                  <span className="text-muted-foreground italic">
                    Тема отсутсвует
                  </span>
                )}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Page;
