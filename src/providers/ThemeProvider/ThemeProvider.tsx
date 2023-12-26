import { PropsWithChildren, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export function ThemeProvider({children} : PropsWithChildren) {
    const [lightMode, setLightMode] = useState<boolean>(localStorage.getItem("darkMode") ? !(JSON.parse(localStorage.getItem("darkMode")!)) : true );

    useEffect(()=>{
        if (!lightMode) {
            document.documentElement.classList.add("dark")
            localStorage.setItem("darkMode", "true")
        } else {
            document.documentElement.classList.remove("dark")
            localStorage.setItem("darkMode", "false")
        }
    }, [lightMode])

    function toggleLightMode() {
        setLightMode(lightMode ? false : true);
    }
    
    return <ThemeContext.Provider value={{lightMode, setLightMode, toggleLightMode}}>{children}</ThemeContext.Provider>
}