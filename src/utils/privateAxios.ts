import axios from "axios";

export const privateAxios = axios.create({
  baseURL: "http://localhost:3000",
});

export const setPrivateAccessToken = (token: string) => {
  privateAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
