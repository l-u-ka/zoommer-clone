import { Outlet } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import Footer from "./Footer/Footer";
import ToggleModeButton from "@src/components/ToggleModeButton/ToggleModeButton";

export function PublicLayout() {

  return (
    <div className="dark:bg-dark-theme-bg">
      <Navigation/>
      <Outlet/>
      <Footer/>
      <ToggleModeButton/>
    </div>
  );
}
