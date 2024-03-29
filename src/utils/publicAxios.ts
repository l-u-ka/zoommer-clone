import axios from "axios";

export const publicAxios = axios.create({
  baseURL: "https://zoommer-clone-ee44dea926d6.herokuapp.com",
});
