import { createContext } from "react";
import {LANGUAGE_ENUM} from '@src/@types/language'

interface TGlobalContext {
  selectedLanguage: LANGUAGE_ENUM;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<LANGUAGE_ENUM>>;
}

export const GlobalContext = createContext<TGlobalContext>({
  selectedLanguage: LANGUAGE_ENUM.GEO,
  setSelectedLanguage: () => {}
});
