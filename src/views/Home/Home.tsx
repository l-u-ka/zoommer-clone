import { useEffect, useState } from "react";
import { axiosInstance } from "@src/utils/publicAxios";

export default function Home() {
  const [count, setCount] = useState(0);

  async function getPosts() {
    const posts = await axiosInstance.get("/posts");
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <h1>Hello world!</h1>
      <button onClick={() => setCount(count + 1)}>increase</button>
      <h1>{count}</h1>
      <button onClick={() => setCount(count - 1)}>decrease</button>
    </div>
  );
}
