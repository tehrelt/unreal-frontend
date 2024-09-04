import { mailService } from "@/services/mail";
import { useQuery } from "@tanstack/react-query";

export const useMailbox = (mailbox: string) => {
  const q = useQuery({
    queryKey: ["mailbox", mailbox],
    queryFn: async () => await mailService.mailbox(mailbox),
  });

  return q;
};
