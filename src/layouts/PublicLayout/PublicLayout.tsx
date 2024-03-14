import { Outlet } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import Footer from "./Footer/Footer";
import ToggleThemeButton from "@src/components/ToggleThemeButton/ToggleThemeButton";
import { useGlobalProvider } from "@src/providers/GlobalProvider/useGlobalProvider";
import ShadowOverlay from "@src/components/ShadowOverlay/ShadowOverlay";
import MobileNavigation from "./Navigation/MobileNavigation/MobileNavigation";

export function PublicLayout() {

  const {showOverlay} = useGlobalProvider();

  return (
    <div className="bg-light-theme-bg dark:bg-dark-theme-bg transition-colors duration-300 ease-in-out min-h-screen">
      <Navigation/>
      <div className="relative min-h-[inherit]">
        <Outlet/>
        <Footer/>
        <ToggleThemeButton/>
        {showOverlay && <ShadowOverlay/>}
        {<MobileNavigation/>}
      </div>
    </div>
  );
}
