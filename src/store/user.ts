import { User } from "@/schemas/user";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UserState {
  user?: User;
}

interface UserActions {
  login: (user: User) => void;
  logout: () => void;
}

type UserStore = UserState & UserActions;

export const useUserStore = create<UserStore>()(
  persist(
    devtools((set) => ({
      user: undefined,
      login: (user) => set({ user }),
      logout: () => set({ user: undefined }),
    })),
    {
      name: "user",
    }
  )
);
