"use client";
import LogoutButton from "@/components/widgets/logout-button";
import { useUser } from "@/hooks/useUser";
import { mailService } from "@/services/mail";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const { user } = useUser();

  const { data } = useQuery({
    queryKey: ["mailboxes"],
    queryFn: mailService.mailboxes,
  });

  return (
    <div>
      <h1>Hello {user?.email}</h1>
      <LogoutButton />

      {data && (
        <ul>
          {data.mailboxes.map((mailbox) => (
            <li key={mailbox.name}>{mailbox.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Page;
