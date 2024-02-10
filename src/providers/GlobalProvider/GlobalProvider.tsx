import { PropsWithChildren, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import { CartITem } from "@src/@types/types";

export function GlobalProvider({ children }: PropsWithChildren) {

  // const [selectedLanguage, setSelectedLanguage] = useState<LANGUAGE_ENUM>(LANGUAGE_ENUM.GEO);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  
  return (
    <GlobalContext.Provider value={{showOverlay, setShowOverlay, loginModalOpen, setLoginModalOpen}}>
      {children}
    </GlobalContext.Provider>
  );
}
