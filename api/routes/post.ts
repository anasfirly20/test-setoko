import api from "../api";

export const getAllPosts = async () => {
  const res = await api.get("/posts");
  return res.data;
};
