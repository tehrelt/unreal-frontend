"use client";
import { ModeToggle } from "@/components/widgets/toggle-theme";
import { Inbox } from "lucide-react";
import { NextPage } from "next";
import { useSearchParams } from "next/navigation";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const sp = useSearchParams();

  const mailbox = sp.get("mailbox");

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Inbox size={128} />
      <p className="text-4xl">Выберите почтовый ящик</p>
    </div>
  );
};

export default Page;
