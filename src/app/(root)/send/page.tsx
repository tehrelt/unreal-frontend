import { NewMailForm } from "@/components/widgets/forms/new-mail/new-mail";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div>
      <NewMailForm />
    </div>
  );
};

export default Page;
