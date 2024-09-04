import { JWT_KEY } from "@/const/jwt";
import { sessionService } from "@/services/session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { VariantProps } from "class-variance-authority";
import { useUserStore } from "@/store/user";

type Props = {
  asChild?: boolean;
} & React.PropsWithChildren &
  VariantProps<typeof buttonVariants>;

export default function LogoutButton({ asChild, children, variant }: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const user = useUserStore((s) => s.user);
  const logout = useUserStore((s) => s.logout);

  const { mutate } = useMutation({
    mutationFn: async () => sessionService.remove(JWT_KEY),
    onSuccess: async () => {
      queryClient.removeQueries({ queryKey: [user?.email] });
      queryClient.removeQueries({ queryKey: ["me"] });
      router.push(`/auth?from=${pathname}`);
      logout();
    },
  });

  const slot = children ? children : "Выйти";

  return (
    <Button
      className="cursor-pointer"
      onClick={() => mutate()}
      variant={variant}
    >
      {slot}
    </Button>
  );
}
