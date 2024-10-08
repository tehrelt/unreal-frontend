import { mailService } from "@/services/mail";
import { useUserStore } from "@/store/user";
import { useQuery } from "@tanstack/react-query";

export const useMailboxes = () => {
  const user = useUserStore((s) => s.user);

  const query = useQuery({
    queryKey: [user?.email, "mailboxes"],
    queryFn: mailService.mailboxes,
  });

  return query;
};
