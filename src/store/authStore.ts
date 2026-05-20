import { create } from "zustand";
import { storage } from "../services/storage";

interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
  image?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;

  login: (data: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: storage.get("token"),
  user:  storage.get("user"),

  login: (data) => {
    storage.set("token", data.accessToken);
    storage.set("user", JSON.stringify(data));
    // localStorage.setItem("token", data.accessToken);
    // localStorage.setItem("user", JSON.stringify(data));

    set({
      token: data.accessToken,
      user: data,
    });
  },

  logout: () => {
    storage.remove("token");
    storage.remove("user");

    set({
      token: null,
      user: null,
    });
  },
}));