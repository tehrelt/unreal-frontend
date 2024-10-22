import { NextPage } from "next";
import StartForm from "./form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <StartForm />
    </div>
  );
};

export default Page;
