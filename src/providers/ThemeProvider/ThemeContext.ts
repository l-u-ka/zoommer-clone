import { createContext } from "react";

interface ThemeContext {
    lightMode: boolean;
    setLightMode: React.Dispatch<React.SetStateAction<boolean>>;
    toggleLightMode: ()=> void;
}

export const ThemeContext = createContext<ThemeContext>({
    lightMode: true,
    setLightMode: () => {},
    toggleLightMode: ()=> {}
})