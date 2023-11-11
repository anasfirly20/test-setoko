import api from "../api";

export const getUsersByQueries = async (string: string) => {
  const res = await api.get(`/search/users?q=${string} in:name type:user`);
  return res.data;
};

export const getUserRepo = async (string: string, page: number) => {
  const res = await api.get(
    `/users/${string}/repos?page=${page}&per_page=100&sort=created`
  );
  return res.data;
};
