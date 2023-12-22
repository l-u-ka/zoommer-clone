import { PropsWithChildren, useState } from "react";
import {LANGUAGE_ENUM} from '@src/@types/language'
import { GlobalContext } from "./GlobalContext";

export function GlobalProvider({ children }: PropsWithChildren) {

  const [selectedLanguage, setSelectedLanguage] = useState<LANGUAGE_ENUM>(LANGUAGE_ENUM.GEO);
  
  return (
    <GlobalContext.Provider value={{selectedLanguage, setSelectedLanguage}}>
      {children}
    </GlobalContext.Provider>
  );
}
