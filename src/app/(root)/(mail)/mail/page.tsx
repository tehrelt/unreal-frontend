"use client";
import { Mail } from "@/components/widgets/mail/mail";
import { NextPage } from "next";
import { notFound, useSearchParams } from "next/navigation";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const sp = useSearchParams();

  const mailbox = sp.get("mailbox");
  if (!mailbox) {
    notFound();
  }
  const mailnum = sp.get("num");
  if (!mailnum) {
    notFound();
  }

  const num = Number(mailnum);

  if (isNaN(num)) {
    notFound();
  }

  return <Mail mailbox={mailbox} num={num} />;
};

export default Page;
