"use client";
import { Mailbox } from "@/components/widgets/mail/mailbox";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return <Mailbox mailbox="INBOX" />;
};

export default Page;
