import { Outlet } from "react-router-dom";
import Navigation from "./Navigation/Navigation";

export function PublicLayout() {
  return (
    <div>
      <Navigation/>
      <Outlet />
    </div>
  );
}
