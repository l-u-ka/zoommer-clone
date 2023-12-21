import { useEffect } from "react";
import { axiosInstance } from "@src/utils/publicAxios";
import { useGlobalProvider } from "@src/providers/GlobalProvider/useGlobalProvider";

export default function Home() {
  const { count, setCount } = useGlobalProvider();

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
