"use client";
import { NextPage } from "next";
import { useSearchParams } from "next/navigation";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const searchParams = useSearchParams();

  const from = searchParams.get("from");

  return (
    <div className="flex justify-center items-center h-screen">
      <div></div>
    </div>
  );
};

export default Page;
