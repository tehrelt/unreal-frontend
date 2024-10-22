import { authService } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

export const useUser = () => {
  const router = useRouter();
  const pathname = usePathname();
  const q = useQuery({
    queryKey: ["me"],
    queryFn: async () => authService.me(),
    retry: false,
  });

  if (q.isError) {
    // router.replace(`/auth?from=${pathname}`);
    toast.error(q.error.name, {
      description: q.error.message,
    });
  }

  return { ...q, user: q.data };
};
