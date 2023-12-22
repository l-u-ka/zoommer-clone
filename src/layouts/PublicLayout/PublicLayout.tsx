import { Outlet } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import Footer from "./Footer/Footer";

export function PublicLayout() {
  return (
    <div>
      <Navigation/>
      <Outlet/>
      <Footer/>
    </div>
  );
}
