"use client";
import { useUser } from "@/hooks/useUser";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const { user } = useUser();

  return <div></div>;
};

export default Page;
