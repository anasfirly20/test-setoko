import api from "../api";

export const getUsersByQueries = async (string: string) => {
  const res = await api.get(`/search/users?q=${string} in:name type:user`);
  return res.data;
};
