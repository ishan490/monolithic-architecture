import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../api/authApi";
import { useAuthStore } from "../store/authStore";

export const useLogin = () => {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: loginApi,

    onSuccess: (data) => {
      login(data);
    },
  });
};