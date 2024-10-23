import { mailService } from "@/services/mail";
import { useUserStore } from "@/store/user";
import { useQuery } from "@tanstack/react-query";

export const useMailboxes = () => {
  const user = useUserStore((s) => s.user);

  const query = useQuery({
    queryKey: ["mailboxes", user?.email],
    queryFn: mailService.mailboxes,
    refetchInterval: 30 * 1000,
  });

  return query;
};
