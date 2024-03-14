import { PropsWithChildren, useState } from "react";
import { GlobalContext } from "./GlobalContext";

export function GlobalProvider({ children }: PropsWithChildren) {

  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  
  return (
    <GlobalContext.Provider value={{showOverlay, setShowOverlay, loginModalOpen, setLoginModalOpen}}>
      {children}
    </GlobalContext.Provider>
  );
}
