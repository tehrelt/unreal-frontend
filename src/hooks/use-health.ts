import { mailService } from "@/services/mail";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useHealth = () => {
  const q = useQuery({
    queryKey: ["server-info"],
    queryFn: async () => mailService.health(),
    retry: false,
  });

  if (q.isError) {
    // router.replace(`/auth?from=${pathname}`);
    toast.error(q.error.name, {
      description: q.error.message,
    });
  }

  return q;
};
