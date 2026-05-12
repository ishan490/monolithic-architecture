import api from "./axios";

export const loginApi = async (data: {
  email: string;
  password: string;
}) => {
  // fake login api
  const response = await api.post("/auth/login", {
    username: "emilys",
    password: "emilyspass",
  });

  return response.data;
};