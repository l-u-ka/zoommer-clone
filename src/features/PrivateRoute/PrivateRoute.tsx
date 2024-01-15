import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuthProvider } from "@src/providers/AuthProvider/useAuthProvider";
import { Auth_Stage_Enum } from "@src/providers/AuthProvider/AuthContext";

export function PrivateRoute({children} : PropsWithChildren) {
    const {authStage} = useAuthProvider();
    return authStage === Auth_Stage_Enum.AUTHORIZED ? (
        children
      ) : (
        <Navigate to="/" />
    );
}