"use client";
import { Mailbox } from "@/components/widgets/mail/mailbox";
import { useParams } from "@/hooks/search-params";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const sp = useParams();
  const mailbox = sp.params.get("mailbox");
  return <Mailbox mailbox={mailbox || "INBOX"} />;
};

export default Page;
