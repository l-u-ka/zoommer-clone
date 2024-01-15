import { Outlet } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import Footer from "./Footer/Footer";
import ToggleModeButton from "@src/components/ToggleModeButton/ToggleModeButton";
import { useAuthProvider } from "@src/providers/AuthProvider/useAuthProvider";

export function PublicLayout() {

  const {userData, authStage} = useAuthProvider();
  console.log(userData, authStage)

  return (
    <div className="dark:bg-dark-theme-bg">
      <Navigation/>
      <Outlet/>
      <Footer/>
      <ToggleModeButton/>
    </div>
  );
}
