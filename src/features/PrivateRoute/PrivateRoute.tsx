import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuthProvider } from "@src/providers/AuthProvider/useAuthProvider";
import { Auth_Stage_Enum } from "@src/providers/AuthProvider/AuthContext";
import LoadingSpinner from "@src/components/LoadingSpinner/LoadingSpinner";

export function PrivateRoute({children} : PropsWithChildren) {
    const {authStage} = useAuthProvider();

    if(authStage === Auth_Stage_Enum.PENDING) {
      return <LoadingSpinner fullscreen={true} custom={false}/>
    }

    return authStage === Auth_Stage_Enum.AUTHORIZED ? (
        children
      ) : (
        <Navigate to="/" />
    );
}