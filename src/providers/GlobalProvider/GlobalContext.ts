import { createContext } from "react";

interface GlobalContext {
  showOverlay: boolean;
  setShowOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  loginModalOpen: boolean;
  setLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalContext = createContext<GlobalContext>({
    showOverlay: false,
    setShowOverlay: ()=> {},
    loginModalOpen: false,
    setLoginModalOpen: ()=> {}
});
