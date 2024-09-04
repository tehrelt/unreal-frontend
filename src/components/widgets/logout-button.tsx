import { JWT_KEY } from "@/const/jwt";
import { sessionService } from "@/services/session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { VariantProps } from "class-variance-authority";

type Props = {
  asChild?: boolean;
} & React.PropsWithChildren &
  VariantProps<typeof buttonVariants>;

export default function LogoutButton({ asChild, children, variant }: Props) {
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

  const slot = asChild ? children : "Выйти";

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
