import axios from "axios";

export const privateAxios = axios.create({
  baseURL: "https://zoommer-clone-ee44dea926d6.herokuapp.com",
});

export const setPrivateAccessToken = (token: string) => {
  privateAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
