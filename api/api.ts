import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN,
  },
});

export default instance;
