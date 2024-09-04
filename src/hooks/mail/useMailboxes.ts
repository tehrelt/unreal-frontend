import { mailService } from "@/services/mail";
import { useQuery } from "@tanstack/react-query";

export const useMailboxes = () => {
  const query = useQuery({
    queryKey: ["mailboxes"],
    queryFn: mailService.mailboxes,
  });

  return query;
};
