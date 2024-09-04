import { mailService } from "@/services/mail";
import { useUserStore } from "@/store/user";
import { useQuery } from "@tanstack/react-query";

export const useMailbox = (mailbox: string) => {
  const user = useUserStore((s) => s.user);

  const q = useQuery({
    queryKey: [user?.email, "mailbox", mailbox],
    queryFn: async () => await mailService.mailbox(mailbox),
  });

  return q;
};
