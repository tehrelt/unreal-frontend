import { NewMailForm } from "@/components/widgets/forms/new-mail/new-mail";
import { NextPage } from "next";

interface Props {
  searchParams: {
    to?: string;
  };
}

const Page: NextPage<Props> = ({ searchParams: { to } }) => {
  return (
    <div>
      <NewMailForm to={to} />
    </div>
  );
};

export default Page;
