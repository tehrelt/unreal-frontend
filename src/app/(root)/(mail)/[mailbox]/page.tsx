import { Mailbox } from "@/components/widgets/mail/mailbox";
import { NextPage } from "next";

interface Props {
  params: {
    mailbox: string;
  };
}

const Page: NextPage<Props> = ({ params: { mailbox } }) => {
  return <Mailbox mailbox={decodeURIComponent(mailbox)} />;
};

export default Page;
