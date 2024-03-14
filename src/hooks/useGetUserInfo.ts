import { UserInfo } from "@src/@types/types";
import { privateAxios } from "@src/utils/privateAxios";
import { useState } from "react";

export default function useGetUserInfo() {
    const [userInfo, setUserInfo] = useState<UserInfo>();
    async function getUserInfo() {
        const response = await privateAxios.get('/user/current-user');
        setUserInfo(response.data)
    }

    return {userInfo, getUserInfo}
}