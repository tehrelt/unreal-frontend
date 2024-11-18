import { mailService } from "@/services/mail";
import { useUserStore } from "@/store/user";
import { useQuery } from "@tanstack/react-query";

export const useMailboxes = () => {
  const user = useUserStore((s) => s.user);

  const query = useQuery({
    queryKey: ["mailboxes", user?.email],
    queryFn: mailService.mailboxes,
    refetchInterval: 30 * 1000,
  });

  const isDraft = (mailbox: string): boolean => {
    if (!query.data) {
      return false;
    }

    const m = query.data.mailboxes.find(
      (v) => v.name.localeCompare(mailbox) == 0
    );

    if (!m) {
      return false;
    }

    return m.attributes.includes("\\Drafts");
  };

  return { ...query, isDraft };
};
