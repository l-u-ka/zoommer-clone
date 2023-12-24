import { LANGUAGE_ENUM } from "@src/@types/types";
import { createContext } from "react";

interface TLocaleContext {
  locale: LANGUAGE_ENUM;
  setLocale: React.Dispatch<React.SetStateAction<LANGUAGE_ENUM>>;
}
export const LocaleContext = createContext<TLocaleContext>({
  locale: LANGUAGE_ENUM.KA,
  setLocale: () => {},
});
