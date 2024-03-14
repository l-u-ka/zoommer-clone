import { useAuthProvider } from "@src/providers/AuthProvider/useAuthProvider";
import { useGlobalProvider } from "@src/providers/GlobalProvider/useGlobalProvider";
import { publicAxios } from "@src/utils/publicAxios";
import { useState } from "react";

export function useUserLogin() {
    const {setAuthData} = useAuthProvider();
    const {setLoginModalOpen} = useGlobalProvider();
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    async function userLogin(email: string, password:string) {
        try {
          setLoading(true);
          setIsError(false)
          const response = await publicAxios.post("/auth/login", {
            email: email,
            password: password
          })
          setAuthData(response.data);
          setLoginModalOpen(false);
        } catch(e) {
          console.error(e)
          setIsError(true)
        } finally {
          setLoading(false);
        }
      }

    return {userLogin, isLoading, isError}
}