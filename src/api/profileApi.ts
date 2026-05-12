import api from "./axios";

export const getProfileApi = async () => {
  const response = await api.get("/auth/me");

  return response.data;
};

export const updateProfileApi = async (data: any) => {
  const response = await api.put("/users/1", data);

  return response.data;
};