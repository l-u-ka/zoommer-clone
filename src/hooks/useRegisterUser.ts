import { useAuthProvider } from "@src/providers/AuthProvider/useAuthProvider";
import { useGlobalProvider } from "@src/providers/GlobalProvider/useGlobalProvider";
import { publicAxios } from "@src/utils/publicAxios";
import { useState } from "react";

export function useRegisterUser() {
    
    const [isError, setIsError] = useState<string>('');
    const [isLoading, setLoading] = useState<boolean>(false);
    const {setAuthData} = useAuthProvider();
    const {setLoginModalOpen} = useGlobalProvider();

    async function registerUser(first_name: string, last_name:string, email: string, password:string, phone_number: string) {
        try {
          setIsError('')
          setLoading(true);
          const response = await publicAxios.post("/auth/register", {
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "password": password,
            "phone_number": phone_number
        })
          setAuthData(response.data);
          setLoginModalOpen(false);
        } catch (e) {
          setIsError('register.error')
          console.error("Did not register successfully", e)
        } finally {
          setLoading(false);
        }
      }

      return {registerUser, isError, isLoading, setIsError}

}