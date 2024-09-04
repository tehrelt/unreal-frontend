import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const set = (key: string, value: string) => {
    const params = new URLSearchParams(sp);
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`);
  };

  const del = (key: string) => {
    const params = new URLSearchParams(sp);
    params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  };

  return { pathname, params: sp, set, del };
};
