import { NextPage } from "next";

interface Props {
  params: {
    mailbox: string;
  };
}

const Page: NextPage<Props> = ({ params: { mailbox } }) => {
  return (
    <div className="flex flex-col">
      <span className="text-5xl font-extrabold m-4 px-4">{mailbox}</span>
    </div>
  );
};

export default Page;
