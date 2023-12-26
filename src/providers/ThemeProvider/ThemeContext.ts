import { createContext } from "react";

interface TThemeContext {
    lightMode: boolean;
    setLightMode: React.Dispatch<React.SetStateAction<boolean>>;
    toggleLightMode: ()=> void;
}

export const ThemeContext = createContext<TThemeContext>({
    lightMode: true,
    setLightMode: () => {},
    toggleLightMode: ()=> {}
})