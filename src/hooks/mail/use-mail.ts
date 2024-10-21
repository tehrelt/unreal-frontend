import { mailService } from "@/services/mail";
import { useQuery } from "@tanstack/react-query";

export const useMessage = (mailbox: string, num: number) => {
  const q = useQuery({
    queryKey: ["message", mailbox, num],
    queryFn: async () => await mailService.message(mailbox, num),
    refetchOnWindowFocus: false,
  });

  return q;
};
