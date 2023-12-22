import { useContext } from "react";
import { LocaleContext } from "./LocaleContext";

export function useLocaleProvider() {
    const {...values} = useContext(LocaleContext);
    return {...values};
}