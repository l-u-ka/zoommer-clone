import { PropsWithChildren, useState } from "react";
import { GlobalContext } from "./GlobalContext";

export function GlobalProvider({ children }: PropsWithChildren) {

  // const [selectedLanguage, setSelectedLanguage] = useState<LANGUAGE_ENUM>(LANGUAGE_ENUM.GEO);
  
  return (
    <GlobalContext.Provider value={{}}>
      {children}
    </GlobalContext.Provider>
  );
}
