import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuthProvider } from "@src/providers/AuthProvider/useAuthProvider";
import { AuthStageEnum } from "@src/providers/AuthProvider/AuthContext";
import LoadingSpinner from "@src/components/LoadingSpinner/LoadingSpinner";

export function PrivateRoute({children} : PropsWithChildren) {
    const {authStage} = useAuthProvider();

    if(authStage === AuthStageEnum.PENDING) {
      return <LoadingSpinner fullscreen={true} custom={false}/>
    }

    return authStage === AuthStageEnum.AUTHORIZED ? (
        children
      ) : (
        <Navigate to="/" />
    );
}