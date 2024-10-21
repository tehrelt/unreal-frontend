import { mailService } from "@/services/mail";
import { useUserStore } from "@/store/user";
import { useQuery } from "@tanstack/react-query";

export const useMessages = (mailbox: string, limit: number) => {
  const user = useUserStore((s) => s.user);

  return useQuery({
    queryKey: [user?.email, "mailbox", mailbox, { limit }],
    queryFn: async () => await mailService.messages(mailbox, limit),
    refetchOnWindowFocus: false,
  });
};
