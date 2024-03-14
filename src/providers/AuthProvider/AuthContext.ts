import { AuthRequest, UserData } from "@src/@types/types";
import { createContext } from "react";

export enum AuthStageEnum {
  AUTHORIZED = "authorized",
  UNAUTHORIZED = "unauthorized",
  PENDING = "pending",
}

interface AuthContext {
  authStage: AuthStageEnum;
  setAuthStage: React.Dispatch<React.SetStateAction<AuthStageEnum>>;
  userData?: UserData;
  setAuthData: (e: AuthRequest) => void;
  logout: () => void;
  getNewTokens: (token: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContext>({
  authStage: AuthStageEnum.UNAUTHORIZED,
  setAuthStage: () => {},
  userData: undefined,
  setAuthData: () => {},
  logout: () => {},
  getNewTokens: async () => {},
});
