import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { Credential } from "@/schemas/login";

interface CredentialsState {
  credentials: Credential[];
}

interface CredentialsActions {
  save: (credential: Credential) => void;
  at: (index: number) => Credential;
  remove: (index: number) => void;
}

type CredentialsStore = CredentialsState & CredentialsActions;

export const useCredentials = create<CredentialsStore>()(
  persist(
    devtools((set, get) => ({
      credentials: [],
      save: (credential) =>
        set((state) => {
          const cred = state.credentials.find(
            (c) => c.email == credential.email && c.host == credential.host
          );

          if (cred) {
            return { credentials: state.credentials };
          }

          return { credentials: [...state.credentials, credential] };
        }),
      at: (index) => get().credentials[index],
      remove: (index) =>
        set((state) => ({
          credentials: [
            ...state.credentials.slice(0, index),
            ...state.credentials.slice(index + 1),
          ],
        })),
    })),
    { name: "saved-credentials" }
  )
);
