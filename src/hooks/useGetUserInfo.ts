import { TUserData } from "@src/@types/types";
import { privateAxios } from "@src/utils/privateAxios";
import { useState } from "react";

enum USER_ROLE {
    CUSTOMER = "customer",
}

interface UserInfoType {
    "id": string,
    "created_at": string,
    "updated_at": string,
    "first_name": string,
    "last_name": string,
    "phone_number": string,
    "email": string,
    "verified": boolean,
    "role": USER_ROLE,
    "password": string,
    "refresh_token": string
}

export default function useGetUserInfo() {
    const [userInfo, setUserInfo] = useState<UserInfoType>();

    async function getUserInfo() {
        const response = await privateAxios.get('/user/current-user');
        setUserInfo(response.data)
    }

    return {userInfo, getUserInfo}
}