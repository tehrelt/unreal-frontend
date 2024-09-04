"use client";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMailbox } from "@/hooks/mail/use-mailbox";
import { useParams } from "@/hooks/search-params";
import { cn } from "@/lib/utils";
import { NextPage } from "next";
import { Mailbox } from "./mailbox";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const { params } = useParams();

  const mailbox = params.get("mailbox");

  return (
    <div className="flex flex-col ">
      {mailbox && <Mailbox mailbox={mailbox} />}
    </div>
  );
};

export default Page;
