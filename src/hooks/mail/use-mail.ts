import { mailService } from "@/services/mail";
import { useQuery } from "@tanstack/react-query";

export const useMail = (mailbox: string, num: number) => {
  const q = useQuery({
    queryKey: ["mail", mailbox, num],
    queryFn: async () => await mailService.mail(mailbox, num),
    refetchOnWindowFocus: false,
  });

  return q;
};
