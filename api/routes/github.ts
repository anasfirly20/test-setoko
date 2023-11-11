import api from "../api";

export const getUsersByQueries = async (username: string) => {
  const res = await api.get(`/search/users?q=${username} in:name type:user`);
  return res.data;
};

export const getUserRepo = async (username: string, page: number) => {
  const res = await api.get(
    `/users/${username}/repos?page=${page}&per_page=100&sort=created`
  );
  return res.data;
};
