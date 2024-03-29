import { useThemeProvider } from "@src/providers/ThemeProvider/useThemeProvider"
import sunIcon from '@src/assets/icons/sun.png'
import moonIcon from '@src/assets/icons/moon.png'

export default function ToggleThemeButton() {
  const {lightMode, toggleLightMode} = useThemeProvider();

  return (
    <div className="shadow-xl z-50 lg:z-[40] w-[26px] lg:w-9 h-[26px] lg:h-9 flex justify-center items-center fixed right-28 lg:right-4 top-3 bottom-auto lg:bottom-4 lg:top-auto rounded-[50%] cursor-pointer bg-orange-main dark:bg-dark-orange-main transition-colors duration-300 ease-in-out" onClick={toggleLightMode}>
      <img alt="theme toggle icon" src={lightMode ? sunIcon : moonIcon} className="w-[18px] lg:w-6"/>
    </div>
  )
}
