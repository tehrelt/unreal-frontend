"use client";
import AuthForm from "@/components/widgets/forms/auth";
import { NextPage } from "next";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const from = searchParams.get("from");

  const onAuth = () => {
    const url = from ?? "/";
    router.push(url);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <AuthForm onSuccess={onAuth} />
      </div>
    </div>
  );
};

export default Page;
