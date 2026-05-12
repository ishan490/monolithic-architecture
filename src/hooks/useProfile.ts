import { useQuery, useMutation } from "@tanstack/react-query";

import {
  getProfileApi,
  updateProfileApi,
} from "../api/profileApi";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfileApi,
  });
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateProfileApi,
  });
};