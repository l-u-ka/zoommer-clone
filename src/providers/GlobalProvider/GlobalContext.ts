import { createContext } from "react";

interface TGlobalContext {
  showOverlay: boolean;
  setShowOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  loginModalOpen: boolean;
  setLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

}

export const GlobalContext = createContext<TGlobalContext>({
    showOverlay: false,
    setShowOverlay: ()=> {},
    loginModalOpen: false,
    setLoginModalOpen: ()=> {}
});
