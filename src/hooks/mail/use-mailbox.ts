import { mailService } from "@/services/mail";
import { useUserStore } from "@/store/user";
import { useQuery } from "@tanstack/react-query";

export const useMailbox = (mailbox: string) => {
  const user = useUserStore((s) => s.user);

  return useQuery({
    queryKey: [user?.email, "mailbox", mailbox],
    queryFn: async () => await mailService.mailbox(mailbox),
    refetchOnWindowFocus: false,
  });
};
