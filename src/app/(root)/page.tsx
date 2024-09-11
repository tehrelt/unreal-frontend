"use client";
import { useParams } from "@/hooks/search-params";
import { NextPage } from "next";
import { Mailbox } from "./mailbox";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const { params } = useParams();

  const mailbox = params.get("mailbox");

  return <div className="">{mailbox && <Mailbox mailbox={mailbox} />}</div>;
};

export default Page;
