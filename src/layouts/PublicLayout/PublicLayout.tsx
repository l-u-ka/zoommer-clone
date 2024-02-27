import { Outlet } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import Footer from "./Footer/Footer";
import ToggleThemeButton from "@src/components/ToggleThemeButton/ToggleThemeButton";
import { useAuthProvider } from "@src/providers/AuthProvider/useAuthProvider";
import { useGlobalProvider } from "@src/providers/GlobalProvider/useGlobalProvider";
import ShadowOverlay from "@src/components/ShadowOverlay/ShadowOverlay";
import MobileNavigation from "./Navigation/MobileNavigation/MobileNavigation";

export function PublicLayout() {

  const {showOverlay} = useGlobalProvider();
  // console.log(userData, authStage);

  return (
    <div className="bg-light-theme-bg dark:bg-dark-theme-bg min-h-screen">
      <Navigation/>
      <div className="relative">
        <Outlet/>
        <Footer/>
        <ToggleThemeButton/>
        {showOverlay && <ShadowOverlay/>}
        {<MobileNavigation/>}
      </div>
    </div>
  );
}
