"use client";
import { useUser } from "@/hooks/useUser";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const { user } = useUser();

  return (
    <div>
      <h1>Hello {user?.email}</h1>
    </div>
  );
};

export default Page;
