import { LanguageEnum } from "@src/@types/types";
import { createContext } from "react";

interface LocaleContext {
  locale: LanguageEnum;
  setLocale: React.Dispatch<React.SetStateAction<LanguageEnum>>;
}
export const LocaleContext = createContext<LocaleContext>({
  locale: LanguageEnum.KA,
  setLocale: () => {},
});
