import { Route } from "@src/@types/types";
import { createContext } from "react";

interface GlobalContext {
  showOverlay: boolean;
  setShowOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  loginModalOpen: boolean;
  setLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  route: Route;
}

export const GlobalContext = createContext<GlobalContext>({
    showOverlay: false,
    setShowOverlay: ()=> {},
    loginModalOpen: false,
    setLoginModalOpen: ()=> {},
    route: {
      to: '',
      from: ''
    }
});
