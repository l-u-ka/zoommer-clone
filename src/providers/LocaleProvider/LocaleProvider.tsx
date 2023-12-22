import { PropsWithChildren, useState } from "react";
import { LocaleContext } from "./LocaleContext";
import { LANGUAGE_ENUM } from "@src/@types/language";

export function LocaleProvider({children} : PropsWithChildren) {
    
    const [locale, setLocale] = useState<LANGUAGE_ENUM>(LANGUAGE_ENUM.KA);

    return (
        <LocaleContext.Provider value={{locale, setLocale}}>{children}</LocaleContext.Provider>
    )
}