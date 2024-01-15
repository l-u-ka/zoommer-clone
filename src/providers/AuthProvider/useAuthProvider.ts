import { AuthContext } from "./AuthContext";
import { useContext } from "react";

export function useAuthProvider() {
    const {...values} = useContext(AuthContext);
    return {...values};
}