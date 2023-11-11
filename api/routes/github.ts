import api from "../api";

export const getUsersByQueries = async (string: string) => {
  const res = await api.get(`/search/users?q=${string} in:name type:user`);
  return res.data;
};

export const getUserRepo = async (string: string) => {
  const res = await api.get(`/users/${string}/repos`);
  console.log("RESSSS >>>", res);
  return res.data;
};
