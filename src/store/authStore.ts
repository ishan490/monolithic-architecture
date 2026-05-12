import { create } from "zustand";

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
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user") || "null"),

  login: (data) => {
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data));

    set({
      token: data.accessToken,
      user: data,
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    set({
      token: null,
      user: null,
    });
  },
}));