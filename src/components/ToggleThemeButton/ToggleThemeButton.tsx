import { useThemeProvider } from "@src/providers/ThemeProvider/useThemeProvider"
import sunIcon from '@src/assets/icons/sun.png'
import moonIcon from '@src/assets/icons/moon.png'

export default function ToggleThemeButton() {
  const {lightMode, toggleLightMode} = useThemeProvider();

  return (
    <div className="z-40 w-[35px] h-[35px] flex justify-center items-center fixed right-4 bottom-4 lg:bottom-8 rounded-[50%] cursor-pointer bg-orange-main dark:bg-dark-orange-main transition-colors duration-300 ease-in-out" onClick={toggleLightMode}>
      <img alt="theme toggle icon" src={lightMode ? sunIcon : moonIcon} className="w-6"/>
    </div>
  )
}
