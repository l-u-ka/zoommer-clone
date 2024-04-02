import { PropsWithChildren, useEffect, useState } from "react";
import { GlobalContext} from "./GlobalContext";
import { useLocation } from "react-router-dom";
import { Route } from "@src/@types/types";

export function GlobalProvider({ children }: PropsWithChildren) {

  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const location = useLocation();
  const [route, setRoute] = useState<Route>({ //--> It can be replaced with useRef or localStorage
    to: location.pathname, // current path
    from: location.pathname //--> previous pathname
  });

  // when user submits form on /buy-product, it is stored in local stage to preserve when refreshing, if user navigates away from the page, clear the local storage
  useEffect(()=> {
    if (route.from.includes('/buy-product') && route.from !== route.to && (localStorage.getItem('city') || localStorage.getItem('address'))) {
      localStorage.removeItem('city');
      localStorage.removeItem('address');
    }
  }, [route])

  useEffect(()=> {
    setRoute((prev)=> ({to: location.pathname, from: prev.to}) )
  }, [location]);
  
  return (
    <GlobalContext.Provider value={{showOverlay, setShowOverlay, loginModalOpen, setLoginModalOpen, route}}>
      {children}
    </GlobalContext.Provider>
  );
}
