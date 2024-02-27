import { PropsWithChildren, useEffect, useState } from "react";
import { AuthContext, Auth_Stage_Enum } from "./AuthContext";
import { TAuthRequest, TUserData } from "@src/@types/types";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@src/config/localStorageKeys";
import { setPrivateAccessToken } from "@src/utils/privateAxios";
import { publicAxios } from "@src/utils/publicAxios";


export function AuthProvider({children} : PropsWithChildren) {

    // const [authStage, setAuthStage] = useState<Auth_Stage_Enum>((localStorage.getItem(REFRESH_TOKEN)) ? Auth_Stage_Enum.AUTHORIZED : Auth_Stage_Enum.UNAUTHORIZED);
    const [authStage, setAuthStage] = useState<Auth_Stage_Enum>(Auth_Stage_Enum.PENDING);
    const [userData, setUserData] = useState<TUserData>();

    console.log("AUTH STAGE IS: ", authStage)

    function setAuthData(tokens: TAuthRequest) {
        const tokenData:TUserData = jwtDecode(tokens.access_token);
        setUserData(tokenData);
        localStorage.setItem(ACCESS_TOKEN, tokens.access_token);
        localStorage.setItem(REFRESH_TOKEN, tokens.refresh_token);
        setPrivateAccessToken(tokens.access_token);
        setAuthStage(Auth_Stage_Enum.AUTHORIZED);
    }

    function logout() {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        setUserData(undefined);
        setAuthStage(Auth_Stage_Enum.UNAUTHORIZED);
        setPrivateAccessToken("")
    }

    async function getNewTokens(refreshToken:string) {
        try {
            // setAuthStage(Auth_Stage_Enum.PENDING);
            const response = await publicAxios.post<TAuthRequest>(
                "/auth/update-tokens",
                { refresh_token: refreshToken }
            );
            setAuthData(response.data);
        } catch(e) {
            logout();
        }
    }

    useEffect(()=> {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        if(refreshToken) getNewTokens(refreshToken);
        else setAuthStage(Auth_Stage_Enum.UNAUTHORIZED);
    }, [])

    return (
        <AuthContext.Provider value={{authStage, setAuthStage, userData, setAuthData, logout, getNewTokens}}>
            {children}
        </AuthContext.Provider>
    )
}