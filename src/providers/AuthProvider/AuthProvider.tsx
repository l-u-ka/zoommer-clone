import { PropsWithChildren, useEffect, useState } from "react";
import { AuthContext, AuthStageEnum } from "./AuthContext";
import { AuthRequest, UserData } from "@src/@types/types";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@src/config/localStorageKeys";
import { setPrivateAccessToken } from "@src/utils/privateAxios";
import { publicAxios } from "@src/utils/publicAxios";


export function AuthProvider({children} : PropsWithChildren) {

    const [authStage, setAuthStage] = useState<AuthStageEnum>(AuthStageEnum.PENDING);
    const [userData, setUserData] = useState<UserData>();
    
    function setAuthData(tokens: AuthRequest) {
        const tokenData:UserData = jwtDecode(tokens.access_token);
        setUserData(tokenData);
        localStorage.setItem(ACCESS_TOKEN, tokens.access_token);
        localStorage.setItem(REFRESH_TOKEN, tokens.refresh_token);
        setPrivateAccessToken(tokens.access_token);
        setAuthStage(AuthStageEnum.AUTHORIZED);
    }

    function logout() {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        setUserData(undefined);
        setAuthStage(AuthStageEnum.UNAUTHORIZED);
        setPrivateAccessToken("")
    }

    async function getNewTokens(refreshToken:string) {
        try {
            const response = await publicAxios.post<AuthRequest>(
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
        else setAuthStage(AuthStageEnum.UNAUTHORIZED);
    }, [])

    return (
        <AuthContext.Provider value={{authStage, setAuthStage, userData, setAuthData, logout, getNewTokens}}>
            {children}
        </AuthContext.Provider>
    )
}