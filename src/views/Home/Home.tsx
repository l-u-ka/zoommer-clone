import { useEffect } from "react";
import { axiosInstance } from "@src/utils/publicAxios";

export default function Home() {
  

  async function getPosts() {
    const posts = await axiosInstance.get("/posts");
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <h1>HOME</h1>
    </div>
  );
}
