import { JWT_KEY } from "@/const/jwt";
import { mailService } from "@/services/mail";
import { sessionService } from "@/services/session";
import { useUserStore } from "@/store/user";
import { useQuery } from "@tanstack/react-query";

export const useMailboxes = () => {
  const user = useUserStore((s) => s.user);

  const query = useQuery({
    queryKey: ["mailboxes", user?.email],
    queryFn: mailService.mailboxes,
  });

  return query;
};
