import { mailService } from "@/services/mail";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useHealth = () => {
  const q = useQuery({
    queryKey: ["server-info"],
    queryFn: async () => mailService.health(),
    retry: false,
    refetchInterval: 1000 * 5,
  });

  return q;
};
