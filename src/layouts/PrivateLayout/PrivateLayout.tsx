import { Outlet } from "react-router-dom";
import ToggleThemeButton from "@src/components/ToggleThemeButton/ToggleThemeButton";
import { useGlobalProvider } from "@src/providers/GlobalProvider/useGlobalProvider";
import ShadowOverlay from "@src/components/ShadowOverlay/ShadowOverlay";
import Navigation from "../PublicLayout/Navigation/Navigation";
import MobileNavigation from "../PublicLayout/Navigation/MobileNavigation/MobileNavigation";

export function PrivateLayout() {

  const {showOverlay} = useGlobalProvider();

  return (
    <div className="dark:bg-dark-theme-bg">
      <Navigation/>
      <div className="relative">
        <Outlet/>
        <ToggleThemeButton/>
        {showOverlay && <ShadowOverlay/>}
        {<MobileNavigation/>}
      </div>
    </div>
  );
}
