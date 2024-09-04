import { JWT_KEY } from "@/const/jwt";
import { sessionService } from "@/services/session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

type Props = {};

export default function LogoutButton({}: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  const { mutate } = useMutation({
    mutationFn: async () => sessionService.remove(JWT_KEY),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      router.push(`/auth?from=${pathname}`);
    },
  });

  return <Button onClick={() => mutate()}>Выйти</Button>;
}
