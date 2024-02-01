import { Outlet } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import Footer from "./Footer/Footer";
import ToggleThemeButton from "@src/components/ToggleThemeButton/ToggleThemeButton";
import { useGlobalProvider } from "@src/providers/GlobalProvider/useGlobalProvider";
import ShadowOverlay from "@src/components/ShadowOverlay/ShadowOverlay";

export function PublicLayout() {

  const {showOverlay} = useGlobalProvider();
  // console.log(userData, authStage);

  return (
    <div className="dark:bg-dark-theme-bg">
      <Navigation/>
      {showOverlay ? <ShadowOverlay>
        <Outlet/>
        <Footer/>
        <ToggleThemeButton/>
      </ShadowOverlay> : <>
        <Outlet/>
        <Footer/>
        <ToggleThemeButton/>
      </>}
      
    </div>
  );
}
