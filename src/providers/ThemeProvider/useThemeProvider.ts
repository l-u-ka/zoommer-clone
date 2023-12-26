import { ThemeContext } from "./ThemeContext";
import { useContext } from "react";

export function useThemeProvider() {
    const {...values} = useContext(ThemeContext);
    return {...values};
}