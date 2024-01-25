import { Outlet } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import Footer from "./Footer/Footer";
import ToggleThemeButton from "@src/components/ToggleThemeButton/ToggleThemeButton";
import { useAuthProvider } from "@src/providers/AuthProvider/useAuthProvider";
import { useGlobalProvider } from "@src/providers/GlobalProvider/useGlobalProvider";
import ShadowOverlay from "@src/components/ShadowOverlay/ShadowOverlay";

export function PublicLayout() {

  const {userData, authStage} = useAuthProvider();
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
