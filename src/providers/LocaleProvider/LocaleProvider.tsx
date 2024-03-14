import { PropsWithChildren, useState } from "react";
import { LocaleContext } from "./LocaleContext";
import { LanguageEnum } from "@src/@types/types";
import { IntlProvider } from "react-intl";
import en from './translations/en.json'
import ka from './translations/ka.json'

export function LocaleProvider({children} : PropsWithChildren) {
    
    const [locale, setLocale] = useState<LanguageEnum>((localStorage.getItem('locale') as LanguageEnum) || LanguageEnum.KA);
    const languages = {en, ka};

    return (
        <LocaleContext.Provider value={{locale, setLocale}}>
            <IntlProvider locale={locale} messages={languages[locale]} defaultLocale="ka">
                {children}
            </IntlProvider>
        </LocaleContext.Provider>
    )
}